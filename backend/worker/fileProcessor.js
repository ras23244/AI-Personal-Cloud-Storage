const { Worker } = require("bullmq")
const axios = require("axios")

const connection = require("../config/redis")
const generateDownloadUrl = require("../services/presignedDownloadService")

new Worker(

    "file-processing",

    async job => {

        try {

            const { key, fileName, userId } = job.data

            console.log("Processing:", fileName)

            const downloadUrl = await generateDownloadUrl(key)

            const response = await axios.post(
                "http://localhost:8000/parse",
                {
                    file_url: downloadUrl
                }
            )

            const chunks = response.data.chunks

            console.log("Chunks generated:", chunks.length)

            // Next stage
            // embeddings
            // vector storage

        }

        catch (err) {

            console.error("Processing failed:", err)

            throw err
        }

    },

    { connection }

)