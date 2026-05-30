// src/middleware/requestLogger.js

// Importa el logger estructurado de Winston.
const logger = require("../config/logger");

/**
 * Middleware de logging HTTP.
 *
 * Registra cada petición cuando termina la respuesta.
 *
 * Información registrada:
 * - método HTTP
 * - URL
 * - código de estado
 * - duración
 * - IP
 *
 * Esto ayuda a trazabilidad, auditoría y diagnóstico de errores.
 */
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request completed", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip
    });
  });

  next();
}

module.exports = requestLogger;