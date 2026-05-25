// src/controllers/HealthController.js
const pool = require("../config/db");
const { getRedisClient } = require("../config/redis");

class HealthController {
  static async check(req, res) {
    const checks = {
      api: "UP",
      database: "DOWN",
      redis: "DOWN"
    };

    try {
      await pool.query("SELECT 1");
      checks.database = "UP";
    } catch (error) {
      checks.database = "DOWN";
    }

    try {
      const redis = await getRedisClient();
      await redis.ping();
      checks.redis = "UP";
    } catch (error) {
      checks.redis = "DOWN";
    }

    const isHealthy =
      checks.api === "UP" &&
      checks.database === "UP" &&
      checks.redis === "UP";

    return res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? "UP" : "DOWN",
      timestamp: new Date().toISOString(),
      checks
    });
  }
}

module.exports = HealthController;