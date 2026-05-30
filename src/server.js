// src/server.js

// Importa Express.
const express = require("express");

// Importa rutas de reportes.
const reportRoutes = require("./routes/reportRoutes");

// Importa rutas de usuarios para login y rutas protegidas.
// Necesitas tener creado src/routes/userRoutes.js.
const userRoutes = require("./routes/userRoutes");

// Crea la aplicación Express.
const app = express();

/**
 * Middleware global para recibir JSON.
 */
app.use(express.json());

/**
 * Rutas de reportes.
 *
 * Endpoint principal:
 * GET /api/reportes/resumen
 */
app.use("/api/reportes", reportRoutes);

/**
 * Rutas de usuarios.
 *
 * Endpoints principales:
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
 * Health check básico.
 *
 * Este endpoint indica si la API está levantada.
 * Para una versión más completa se puede validar Redis y base de datos.
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Green Mantenimientos API",
    timestamp: new Date().toISOString()
  });
});

// Puerto del servidor.
const PORT = process.env.PORT || 3000;

/**
 * Levanta el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});