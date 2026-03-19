const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const r2Client = require("../config/r2Client");

async function generateUploadUrl(key, contentType) {

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType
    });

    const url = await getSignedUrl(r2Client, command, { expiresIn: 60 });

    return url;
}

module.exports = generateUploadUrl;