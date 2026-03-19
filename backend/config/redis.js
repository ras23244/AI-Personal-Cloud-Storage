const IORedis = require("ioredis");

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379
});

connection.on("connect", () => {
    console.log("Redis connected");
});

connection.on("error", (err) => {
    console.error("Redis error:", err);
});


module.exports = connection;