const index = require("../config/pinecone")

async function searchSimilar(queryEmbedding, userId) {

    const results = await index.query({
        vector: queryEmbedding,
        topK: 5,
        includeMetadata: true
    })

    // filter by userId
    const filtered = results.matches.filter(
        item => item.metadata.userId === userId
    )

    return filtered
}

module.exports = searchSimilar