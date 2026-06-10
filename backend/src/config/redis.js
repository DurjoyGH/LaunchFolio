const { default: IORedis } = require("ioredis");

let redisClient = null;

const buildRedisOptions = () => {
  const baseOptions = {
    maxRetriesPerRequest: null, // Required by BullMQ
    lazyConnect: false,
  };

  const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL;
  if (redisUrl) {
    return {
      connection: redisUrl,
      options: {
        ...baseOptions,
        ...(redisUrl.startsWith("rediss://") ? { tls: { rejectUnauthorized: false } } : {}),
      },
    };
  }

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const { hostname } = new URL(process.env.UPSTASH_REDIS_REST_URL);
    return {
      options: {
        ...baseOptions,
        host: hostname,
        port: parseInt(process.env.UPSTASH_REDIS_PORT, 10) || 6379,
        username: process.env.UPSTASH_REDIS_USERNAME || "default",
        password: process.env.UPSTASH_REDIS_REST_TOKEN,
        tls: {},
      },
    };
  }

  return {
    options: {
      ...baseOptions,
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  };
};

const getRedisClient = () => {
  if (redisClient) return redisClient;

  const { connection, options } = buildRedisOptions();
  redisClient = connection ? new IORedis(connection, options) : new IORedis(options);

  redisClient.on("connect", () => console.log("✅ Redis connected"));
  redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));

  return redisClient;
};

module.exports = { getRedisClient };
