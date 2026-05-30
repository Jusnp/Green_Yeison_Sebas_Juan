// src/config/logger.js

// Importa Winston, librería para logging estructurado.
const winston = require("winston");

/**
 * Logger principal de la aplicación.
 *
 * Este logger genera logs en formato JSON, lo cual facilita:
 * - búsqueda
 * - análisis
 * - monitoreo
 * - auditoría
 *
 * Campos incluidos:
 * - timestamp
 * - level
 * - message
 * - service
 * - contexto adicional
 */
const logger = winston.createLogger({
  level: "info",

  // Formato estructurado en JSON.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  // Información común para todos los logs.
  defaultMeta: {
    service: "green-mantenimientos-api"
  },

  // Transporte de logs.
  // En este caso se imprimen en consola.
  // En producción Docker puede capturar estos logs desde stdout.
  transports: [
    new winston.transports.Console()
  ]
});

// Exporta el logger para usarlo en middlewares, controladores y servicios.
module.exports = logger;