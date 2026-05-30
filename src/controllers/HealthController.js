// src/controllers/HealthController.js

// Importa la conexión a PostgreSQL.
const pool = require("../config/db");

// Importa la función para obtener conexión a Redis.
const { getRedisClient } = require("../config/redis");

/**
 * HealthController
 *
 * Controlador encargado de reportar el estado del sistema.
 *
 * Endpoint esperado:
 * GET /health
 *
 * Verifica:
 * - API
 * - Base de datos PostgreSQL
 * - Redis
 *
 * Si todo está bien, responde 200 UP.
 * Si algo falla, responde 503 DOWN.
 */
class HealthController {
  static async check(req, res) {
    // Estado inicial de los componentes.
    const checks = {
      api: "UP",
      database: "DOWN",
      redis: "DOWN"
    };

    /**
     * Verificación de PostgreSQL.
     *
     * SELECT 1 es una consulta liviana para comprobar
     * que la base de datos responde.
     */
    try {
      await pool.query("SELECT 1");
      checks.database = "UP";
    } catch (error) {
      checks.database = "DOWN";
    }

    /**
     * Verificación de Redis.
     *
     * ping() permite comprobar que Redis está disponible.
     */
    try {
      const redis = await getRedisClient();
      await redis.ping();
      checks.redis = "UP";
    } catch (error) {
      checks.redis = "DOWN";
    }

    // El sistema está saludable solo si todos los componentes están UP.
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