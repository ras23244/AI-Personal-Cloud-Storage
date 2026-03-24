

const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
   
});

connection.on("connect", () => {
    console.log("Redis Cloud connected");
});

connection.on("error", (err) => {
    console.error("Redis error:", err);
});

module.exports = connection;