const path = require("path")
require("dotenv").config({
    path: path.resolve(__dirname, ".env")
})

const { generateEmbedding } = require("./services/embeddingService")
const searchSimilar = require("./services/pineconeSearch")

async function test() {

    const query = "somatosensory system receptors"

    const embedding = await generateEmbedding(query)

    console.log("Query embedding length:", embedding.length)

    const results = await searchSimilar(embedding, "test-user")

    console.log("\nTop Results:\n")
    console.dir(results, { depth: null })
}

test()