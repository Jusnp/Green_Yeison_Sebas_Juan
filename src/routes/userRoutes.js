// src/routes/userRoutes.js

// Importa Express para crear rutas.
const express = require('express');

// Crea un router separado para el módulo de usuarios.
const router = express.Router();

// Importa el controlador encargado del login.
const AuthController = require('../controllers/AuthController');

// Importa el middleware de autenticación JWT.
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Ruta pública de login.
 *
 * Método: POST
 * URL final:
 * /api/users/login
 *
 * Esta ruta no usa authMiddleware porque el usuario todavía no tiene token.
 */
router.post('/login', AuthController.login);

/**
 * Ruta protegida de ejemplo.
 *
 * Método: GET
 * URL final:
 * /api/users/mantenimientos/historial
 *
 * Antes de ejecutar la respuesta, Express ejecuta authMiddleware.
 * Si el token es válido, authMiddleware agrega los datos del usuario en req.user.
 */
router.get('/mantenimientos/historial', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Acceso concedido.",
    datos: `Historial protegido procesado para el usuario con ID: ${req.user.id} y Rol: ${req.user.rol}`
  });
});

// Exporta el router para usarlo en server.js.
module.exports = router;