const express = require("express")
const router = express.Router()
const { search } = require("../controllers/searchController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/content",authMiddleware, search)

module.exports = router