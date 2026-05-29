// src/routes/userRoutes.js

// Importa Express.
const express = require('express');

// Crea un router para agrupar las rutas relacionadas con usuarios.
const router = express.Router();

// Importa el controlador que maneja el login.
const AuthController = require('../controllers/AuthController');

// Importa el middleware que protege rutas con JWT.
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Ruta pública de login.
 *
 * Método:
 * POST
 *
 * URL final:
 * /api/users/login
 *
 * Esta ruta no usa authMiddleware porque el usuario todavía no tiene token.
 */
router.post('/login', AuthController.login);

/**
 * Ruta protegida de ejemplo.
 *
 * Método:
 * GET
 *
 * URL final:
 * /api/users/mantenimientos/historial
 *
 * Antes de ejecutar la función final, Express ejecuta authMiddleware.
 * Si el token es válido, authMiddleware agrega los datos del usuario en req.user.
 */
router.get('/mantenimientos/historial', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Acceso concedido.",
    datos: `Historial protegido procesado para el usuario con ID: ${req.user.id} y Rol: ${req.user.rol}`
  });
});

// Exporta las rutas para registrarlas en server.js.
module.exports = router;