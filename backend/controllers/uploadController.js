const { v4: uuidv4 } = require("uuid");
const generateUploadUrl = require("../services/presignedService");
const File = require("../models/File");
const fileProcessingQueue = require("../queues/fileProcessingQueue");

exports.getUploadUrl = async (req, res) => {

    try {

        const { fileName, fileType } = req.body;
      
        const key = `${req.user.userId}/${uuidv4()}-${fileName}`;

        const uploadUrl = await generateUploadUrl(key, fileType);

        res.json({
            uploadUrl,
            key
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Failed to generate upload URL" });

    }

};

exports.uploadComplete = async (req, res) => {

    try {

        const { fileName, key, size } = req.body;

        const file = new File({
            userId: req.user.userId,
            fileName,
            key,
            size
        });

        await file.save();

        await fileProcessingQueue.add("process-file", {
            key,
            fileName,
            userId: req.user.userId,
            fileIdReal: file._id.toString() 
        })

        res.json({ message: "File metadata saved" });

    } catch (error) {

        res.status(500).json({ error: "Failed to save metadata" });

    }

};