const { GoogleGenerativeAI } = require("@google/generative-ai")
require("dotenv").config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-embedding-001"
})

// Single embedding (kept for reuse)
async function generateEmbedding(text) {
    const result = await model.embedContent(text)
    return result.embedding.values
}

// Batch embeddings (controlled parallel processing)
async function generateEmbeddingsBatch(texts, batchSize = 5) {
    console.log("generating embeddings for batch of size:", texts.length)
    const results = []

    for (let i = 0; i < texts.length; i += batchSize) {

        const batch = texts.slice(i, i + batchSize)

        const batchResults = await Promise.all(
            batch.map(async (text) => {
                try {
                    const res = await generateEmbedding(text)
                    console.log("Generated embedding for text of length:", text.length)
                    return res
                } catch (err) {
                    console.error("Embedding failed:", err.message)
                    return null
                }
            })
        )
        console.log(`Batch ${i / batchSize + 1} processed.`)
        results.push(...batchResults)
    }

    return results
}

module.exports = {
    generateEmbedding,
    generateEmbeddingsBatch
}