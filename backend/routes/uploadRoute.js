const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload-url", authMiddleware, uploadController.getUploadUrl);

router.post("/upload-complete", authMiddleware, uploadController.uploadComplete);

module.exports = router;