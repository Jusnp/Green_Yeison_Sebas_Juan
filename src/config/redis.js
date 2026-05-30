// src/config/redis.js

// Importa createClient desde la librería redis.
// Esta librería permite conectar Node.js con un servidor Redis.
const { createClient } = require("redis");

// Variable global para reutilizar la conexión a Redis.
// Esto evita crear una conexión nueva en cada petición.
let redisClient;

/**
 * Obtiene una conexión activa a Redis.
 *
 * Si ya existe un cliente conectado, lo reutiliza.
 * Si no existe, crea uno nuevo y lo conecta.
 *
 * Esto es importante para el patrón Cache-Aside, porque Redis se usa
 * como almacenamiento temporal de respuestas pesadas.
 *
 * @returns {Promise<Object>} Cliente Redis conectado.
 */
async function getRedisClient() {
  // Si ya hay una conexión abierta, se reutiliza.
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  // Crea el cliente Redis.
  // En local usa redis://localhost:6379.
  // En Docker normalmente se usa redis://redis:6379 mediante variable REDIS_URL.
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
  });

  // Manejo de errores de Redis.
  redisClient.on("error", (error) => {
    console.error("Error en Redis:", error.message);
  });

  // Abre la conexión con Redis.
  await redisClient.connect();

  // Retorna el cliente conectado.
  return redisClient;
}

// Exporta la función para usarla en controladores o servicios.
module.exports = {
  getRedisClient
};