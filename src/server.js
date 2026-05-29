// src/server.js

/**
 * Archivo principal de la aplicación.
 *
 * Este archivo:
 * - Crea la aplicación Express.
 * - Habilita JSON.
 * - Registra las rutas.
 * - Define una ruta de prueba.
 * - Levanta el servidor.
 */

// Importar Express.
const express = require("express");

// Importar rutas de usuarios.
const userRoutes = require("./routes/userRoutes");

// Crear la aplicación.
const app = express();

/**
 * Middleware global para procesar JSON.
 *
 * Permite que Express lea datos enviados en el body de peticiones POST,
 * por ejemplo:
 * {
 *   "email": "admin@green.com",
 *   "password": "admin123"
 * }
 */
app.use(express.json());

/**
 * Registro de rutas del módulo de usuarios.
 *
 * Todas las rutas de userRoutes.js tendrán el prefijo /api/users.
 *
 * Rutas finales:
 * POST /api/users/login
 * GET  /api/users/mantenimientos/historial
 */
app.use("/api/users", userRoutes);

/**
 * Ruta de prueba.
 *
 * Sirve para comprobar que el servidor está funcionando.
 *
 * URL:
 * GET /
 */
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Puerto donde se ejecutará la API.
const PORT = 3000;

/**
 * Inicia el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});