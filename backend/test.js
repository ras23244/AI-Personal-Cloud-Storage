const { generateEmbedding } = require("./services/embeddingService")

async function test() {

    const text1 = "The sun rises over the ocean"
    const text2 = "A beautiful beach with sunlight"
    const text3 = "Car engine failure in highway"

    const emb1 = await generateEmbedding(text1)
    const emb2 = await generateEmbedding(text2)
    const emb3 = await generateEmbedding(text3)


    // Cosine similarity
    function cosine(a, b) {
        let dot = 0, magA = 0, magB = 0

        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i]
            magA += a[i] * a[i]
            magB += b[i] * b[i]
        }

        return dot / (Math.sqrt(magA) * Math.sqrt(magB))
    }


}

test()