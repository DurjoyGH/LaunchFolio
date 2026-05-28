const { default: IORedis } = require("ioredis");

let redisClient = null;

const getRedisClient = () => {
  if (redisClient) return redisClient;

  redisClient = new IORedis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    maxRetriesPerRequest: null, // Required by BullMQ
    lazyConnect: false,
  });

  redisClient.on("connect", () => console.log("✅ Redis connected"));
  redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));

  return redisClient;
};

module.exports = { getRedisClient };
