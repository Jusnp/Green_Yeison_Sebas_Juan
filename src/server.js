// src/server.js

// Importa Express, framework para crear la API.
const express = require("express");

// Importa las rutas de usuarios.
const userRoutes = require("./routes/userRoutes");

// Crea la aplicación Express.
const app = express();

/**
 * Middleware global para recibir JSON.
 *
 * Permite que Express entienda cuerpos JSON enviados en peticiones POST,
 * por ejemplo:
 * {
 *   "email": "admin@green.com",
 *   "password": "admin123"
 * }
 */
app.use(express.json());

/**
 * Registra las rutas de usuarios con el prefijo /api/users.
 *
 * Rutas finales:
 * POST /api/users/login
 * GET  /api/users/mantenimientos/historial
 */
app.use("/api/users", userRoutes);

/**
 * Ruta de prueba.
 *
 * Sirve para comprobar rápidamente que el servidor está funcionando.
 *
 * URL:
 * GET /
 */
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Puerto donde se ejecutará el servidor.
const PORT = 3000;

/**
 * Levanta el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});