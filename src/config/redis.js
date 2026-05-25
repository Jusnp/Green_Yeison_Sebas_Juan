// src/config/redis.js
const { createClient } = require("redis");

let redisClient;

async function getRedisClient() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
  });

  redisClient.on("error", (error) => {
    console.error("Error en Redis:", error.message);
  });

  await redisClient.connect();

  return redisClient;
}

module.exports = {
  getRedisClient
};