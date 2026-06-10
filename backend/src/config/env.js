/**
 * Validated environment configuration.
 * Fails fast if required variables are missing.
 */

const required = [
  "PORT",
  "DB_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "AI_API_KEY",
  "AI_MODEL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missing = required.filter((key) => !process.env[key]);
const hasRedisConfig =
  process.env.REDIS_URL
  || process.env.UPSTASH_REDIS_URL
  || (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  || (process.env.REDIS_HOST && process.env.REDIS_PORT);

if (!hasRedisConfig) {
  missing.push("REDIS_URL or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN or REDIS_HOST/REDIS_PORT");
}

if (missing.length > 0) {
  console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",

  db: {
    url: process.env.DB_URL,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  ai: {
    apiKey: process.env.AI_API_KEY,
    model: process.env.AI_MODEL,
  },

  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  github: {
    token: process.env.GITHUB_TOKEN,
  },

  vercel: {
    token: process.env.VERCEL_TOKEN,
  },

  redis: {
    url: process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL,
    upstashRestUrl: process.env.UPSTASH_REDIS_REST_URL,
    upstashRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
};
