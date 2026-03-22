const searchFiles = require("../services/fileSearchService")

async function search(req, res) {
    try {
        const { query } = req.body;
        const userId = req.user?.userId ;
        console.log("userId in search controller", userId)
        if (!query) {
            return res.status(400).json({ error: "Query required" })
        }

        const results = await searchFiles(query, userId)
        console.log("Search results:", results)
        res.json({
            success: true,
            results
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Search failed" })
    }
}

module.exports = { search }