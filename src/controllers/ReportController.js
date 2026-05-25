// src/controllers/ReportController.js
const ReportService = require("../services/ReportService");
const { getRedisClient } = require("../config/redis");

class ReportController {
  static async getResumen(req, res) {
    const cacheKey = "reportes:resumen:mantenimientos";

    try {
      const redis = await getRedisClient();

      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.status(200).json({
          success: true,
          source: "cache",
          data: JSON.parse(cachedData)
        });
      }

      const data = await ReportService.getResumenMantenimientos();

      await redis.set(cacheKey, JSON.stringify(data), {
        EX: 60
      });

      return res.status(200).json({
        success: true,
        source: "database",
        data
      });
    } catch (error) {
      console.error("Error en ReportController:", error.message);

      return res.status(500).json({
        success: false,
        message: "Error al obtener el resumen de mantenimientos."
      });
    }
  }
}

module.exports = ReportController;