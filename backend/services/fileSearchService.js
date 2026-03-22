const index = require("../config/pinecone")
const { generateEmbedding } = require("./embeddingService")

function rankFiles(matches) {

    const fileMap = {}

    matches.forEach(match => {

        const { fileId, fileName,_id } = match.metadata
        const score = match.score

        if (!fileMap[fileId]) {
            fileMap[fileId] = {
                mongoId: _id,
                fileName,
                totalScore: 0,
                maxScore: 0,
                count: 0,
                previews: []
            }
        }

        fileMap[fileId].totalScore += score
        fileMap[fileId].count += 1
        fileMap[fileId].maxScore = Math.max(fileMap[fileId].maxScore, score)

        fileMap[fileId].previews.push({
            text: match.metadata.text,
            score
        })
    })

    const ranked = Object.entries(fileMap).map(([fileId, data]) => {

        data.previews.sort((a, b) => b.score - a.score)

        const finalScore =
            (data.totalScore / data.count) + (data.maxScore * 0.3)

        return {
            fileId: data.mongoId || fileId,  // ✅ USE Mongo ID (fallback safe)
            fileName: data.fileName,
            score: finalScore,
            preview: data.previews.slice(0, 2)
        }
    })

    ranked.sort((a, b) => b.score - a.score)

    return ranked
}

async function searchFiles(query, userId) {

    // 1. Query → embedding
    const queryEmbedding = await generateEmbedding(query)

    // 2. Search Pinecone
    const results = await index.query({
        vector: queryEmbedding,
        topK: 30, // 🔥 IMPORTANT
        includeMetadata: true
    })

    // 3. Filter user-specific data
    const filtered = results.matches.filter(
        m => m.metadata.userId === userId
    )

    // 4. Rank files
    const rankedFiles = rankFiles(filtered)

    // 5. Return top 10 files
    return rankedFiles.slice(0, 10)
}

module.exports = searchFiles