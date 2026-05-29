// src/server.js

/**
 * Archivo principal de la aplicación.
 *
 * Aquí se configura Express, se activan los middlewares globales,
 * se registran las rutas y se levanta el servidor.
 */

// Importa Express.
const express = require("express");

// Importa las rutas del módulo de usuarios.
const userRoutes = require("./routes/userRoutes");

// Crea la aplicación Express.
const app = express();

/**
 * Habilita el manejo de JSON.
 *
 * Permite recibir cuerpos JSON en peticiones POST,
 * por ejemplo en /api/users/login.
 */
app.use(express.json());

/**
 * Registra las rutas de usuarios con el prefijo /api/users.
 *
 * Ejemplos:
 * POST /api/users/login
 * GET  /api/users/mantenimientos/historial
 */
app.use("/api/users", userRoutes);

/**
 * Ruta de prueba.
 *
 * Sirve para verificar rápidamente si la API está corriendo.
 */
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Puerto de ejecución del servidor.
const PORT = 3000;

/**
 * Levanta el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});