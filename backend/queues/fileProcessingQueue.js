const { Queue } = require("bullmq");
const connection = require("../config/redis");

const fileProcessingQueue = new Queue("file-processing", { connection });

module.exports = fileProcessingQueue;