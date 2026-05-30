// src/config/redis.js

// Importa createClient desde redis.
const { createClient } = require("redis");

// Importa el logger para registrar errores de conexión.
const logger = require("./logger");

// Variable global para reutilizar el cliente de Redis.
let redisClient;

/**
 * Obtiene o crea una conexión a Redis.
 *
 * Si ya existe un cliente conectado, lo reutiliza.
 * Si no existe, crea uno nuevo.
 *
 * Esto evita abrir múltiples conexiones innecesarias.
 */
async function getRedisClient() {
  // Si ya existe una conexión abierta, se retorna esa misma.
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  // Crea el cliente Redis.
  // En Docker normalmente REDIS_URL será: redis://redis:6379
  // En local normalmente será: redis://localhost:6379
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
  });

  // Registra errores de Redis con Winston.
  redisClient.on("error", (error) => {
    logger.error("Error en Redis", {
      context: "RedisClient",
      error: error.message
    });
  });

  // Abre la conexión a Redis.
  await redisClient.connect();

  return redisClient;
}

module.exports = {
  getRedisClient
};