const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
    getFiles,
    getFileDetails,
} = require("../controllers/fileController")

router.get("/allfiles", authMiddleware,getFiles)
router.get("/:fileId",authMiddleware, getFileDetails)

module.exports = router