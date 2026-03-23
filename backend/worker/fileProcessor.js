const { Worker } = require("bullmq")
const axios = require("axios")
const path = require("path")
const mongoose = require('mongoose')

require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
})

const connectDB = require("../config/mongo")
connectDB()

const connection = require("../config/redis")
const generateDownloadUrl = require("../services/presignedDownloadService")
const { generateEmbeddingsBatch } = require("../services/embeddingService")
const File = require("../models/File")
const index = require("../config/pinecone")


new Worker(

    "file-processing",

    async job => {

        // Ensure DB connection before processing
        await mongoose.connection.asPromise();

        try {

            const { key, fileName, userId, fileIdReal } = job.data;

            console.log("Processing:", fileName, "(key:", key, ")")

            // optional: update file stage to 'processing'
            await File.findOneAndUpdate({ key }, { stage: "processing" }, { returnDocument: "after" })

            const downloadUrl = await generateDownloadUrl(key)

            const response = await axios.post(
                "http://localhost:8000/parse",
                {
                    file_url: downloadUrl
                }
            )

            if (!response.data || !Array.isArray(response.data.chunks)) {
                throw new Error("Invalid parse response from document service")
            }

            const chunks = response.data.chunks

            console.log("Chunks generated:", chunks.length)

            const validChunks = chunks.filter(chunk => chunk.text && chunk.text.trim().length > 20)
            const texts = validChunks.map(chunk => chunk.text)

            console.log("Valid chunks:", validChunks.length)

            if (validChunks.length === 0) {
                console.warn("No valid text chunks found for:", fileName)
                await File.findOneAndUpdate({ key }, { stage: "failed" })
                return
            }

            const embeddings = await generateEmbeddingsBatch(texts, 5)

            console.log("Embeddings generated:", embeddings.length)

            if (embeddings.length !== validChunks.length) {
                console.warn("Embedding count mismatch:", embeddings.length, "vs chunks", validChunks.length)
            }

            // ✅ STEP 3: Merge embeddings back with valid chunks
            const enrichedChunks = validChunks.map((chunk, index) => ({
                ...chunk,
                embedding: embeddings[index] || null
            }))

            const records = enrichedChunks
                .map((chunk, idx) => ({
                    id: `${key}-${idx}`,
                    values: chunk.embedding,
                    metadata: {
                        text: chunk.text,
                        userId,
                        fileName,
                        fileId: key,
                        _id: fileIdReal
                    }
                }))
                .filter(r => Array.isArray(r.values) && r.values.length > 0)

            if (records.length === 0) {
                console.warn("No valid records to upsert for:", fileName)
                await File.findOneAndUpdate({ key }, { stage: "failed" })
                return
            }

            // Upsert into Pinecone
            await index.upsert({ records })
            console.log("Stored in Pinecone:", records.length)

            await File.findOneAndUpdate({ key }, { stage: "processed" })

            console.log("File processing finished", fileName)

        }

        catch (err) {

            console.error("Processing failed:", err)

            // update stage for monitoring
            if (job.data && job.data.key) {
                try {
                    await File.findOneAndUpdate({ key: job.data.key }, { stage: "failed" })
                } catch (innerErr) {
                    console.error("Failed to mark file stage as failed:", innerErr)
                }
            }

            throw err
        }

    },

    { connection }

)