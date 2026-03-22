const File = require("../models/File")
const mongoose = require("mongoose")
exports.getFiles=async(req, res)=> {
    try {
        const userId = req.user?.userId;
        console.log("userId in getFiles controller", userId)
        const files = await File.find({
            userId: new mongoose.Types.ObjectId(userId)  
        }).sort({ createdAt: -1 });
        console.log("Files found:", files.length)
        res.json({
            success: true,
            files
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch files" })
    }
};



exports.getFileDetails = async (req, res) => {
    try {
        const { fileId } = req.params
        const userId = req.user?.userId || "69b5036cd065112291892e81"

        const file = await File.findOne({
            _id: fileId,
            userId
        })

        if (!file) {
            return res.status(404).json({ error: "File not found" })
        }

        res.json({
            success: true,
            file
        })

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch file details" })
    }
};