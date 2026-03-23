const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
    getFiles,
    getFileDetails,
    getFileUrl
} = require("../controllers/fileController")

router.get("/allfiles", authMiddleware,getFiles)
router.get("/:fileId",authMiddleware, getFileDetails)

router.get("/:fileId/url",authMiddleware, getFileUrl);

module.exports = router