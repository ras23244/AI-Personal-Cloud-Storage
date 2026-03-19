const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileHash: String,

    fileName: String,

    key: String,

    size: Number,
    stage:{
        type: String,
        enum: ["uploaded", "processing", "processed","failed"],
        default: "processing"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("File", fileSchema);