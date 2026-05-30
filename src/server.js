// src/server.js

// Importa Express.
const express = require("express");

// Importa el controlador de health check.
const HealthController = require("./controllers/HealthController");

// Importa middleware de métricas Prometheus.
const { metricsMiddleware, register } = require("./middleware/metricsMiddleware");

// Importa middleware de logging con Winston.
const requestLogger = require("./middleware/requestLogger");

// Importa rutas de usuarios.
const userRoutes = require("./routes/userRoutes");

// Crea la aplicación Express.
const app = express();

/**
 * Middleware para leer JSON.
 */
app.use(express.json());

/**
 * Middleware de logs.
 *
 * Registra cada petición HTTP usando Winston.
 */
app.use(requestLogger);

/**
 * Middleware de métricas.
 *
 * Cuenta peticiones HTTP para Prometheus.
 */
app.use(metricsMiddleware);

/**
 * Rutas de usuarios.
 *
 * Ejemplos:
 * POST /api/users/login
 * GET  /api/users/mantenimientos/historial
 */
app.use("/api/users", userRoutes);

/**
 * Ruta principal de prueba.
 */
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

/**
 * Health check real.
 *
 * Valida API, PostgreSQL y Redis.
 */
app.get("/health", HealthController.check);

/**
 * Endpoint de métricas para Prometheus.
 */
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Puerto de la aplicación.
const PORT = process.env.PORT || 3000;

/**
 * Levanta el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});