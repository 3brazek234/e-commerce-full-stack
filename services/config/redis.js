const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
redis.on("connect", () => {
  console.log("✅ Connected to Redis App 2 successfully on port 6381");
});
redis.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err);
});
module.exports = redis;
