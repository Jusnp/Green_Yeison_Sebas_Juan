// src/controllers/ReportController.js

// Servicio que simula una consulta pesada de reportes.
const ReportService = require("../services/ReportService");

// Cliente Redis usado para aplicar el patrón Cache-Aside.
const { getRedisClient } = require("../config/redis");

/**
 * Controlador de reportes.
 *
 * Este controlador implementa el patrón Cache-Aside:
 *
 * 1. Primero busca la información en Redis.
 * 2. Si existe en caché, responde desde Redis.
 * 3. Si no existe, consulta el servicio de reportes.
 * 4. Guarda el resultado en Redis con un tiempo de expiración.
 * 5. Responde al cliente.
 */
class ReportController {
  /**
   * Obtiene el resumen de mantenimientos.
   *
   * Ruta esperada:
   * GET /api/reportes/resumen
   *
   * Esta ruta simula un endpoint pesado que se beneficia del caché.
   */
  static async getResumen(req, res) {
    // Llave única para guardar y consultar el resumen en Redis.
    const cacheKey = "reportes:resumen:mantenimientos";

    try {
      // Obtiene conexión a Redis.
      const redis = await getRedisClient();

      // Busca si el resumen ya existe en caché.
      const cachedData = await redis.get(cacheKey);

      /**
       * Cache Hit:
       *
       * Si Redis tiene el dato, se responde inmediatamente desde caché.
       * Esto evita consultar nuevamente la base de datos o el servicio pesado.
       */
      if (cachedData) {
        return res.status(200).json({
          success: true,
          source: "cache",
          data: JSON.parse(cachedData)
        });
      }

      /**
       * Cache Miss:
       *
       * Si Redis no tiene el dato, se consulta el servicio.
       * En este caso ReportService simula una consulta pesada.
       */
      const data = await ReportService.getResumenMantenimientos();

      /**
       * Guarda el resultado en Redis.
       *
       * EX: 60 significa que el dato expira en 60 segundos.
       * Esto evita que el caché quede desactualizado indefinidamente.
       */
      await redis.set(cacheKey, JSON.stringify(data), {
        EX: 60
      });

      // Responde indicando que la información vino desde "database".
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