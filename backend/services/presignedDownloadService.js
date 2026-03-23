const { GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const r2Client = require("../config/r2Client")

async function generateDownloadUrl(key) {

    const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
     
    })

    const url = await getSignedUrl(r2Client, command, {
        expiresIn: 300
    })

    return url
}

module.exports = generateDownloadUrl