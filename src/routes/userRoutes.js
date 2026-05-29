// src/routes/userRoutes.js

// Importa Express.
const express = require('express');

// Crea un router para manejar rutas de usuarios.
const router = express.Router();

// Importa el controlador de autenticación.
const AuthController = require('../controllers/AuthController');

// Importa el middleware de seguridad JWT.
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Ruta pública de login.
 *
 * Método: POST
 * URL final: /api/users/login
 *
 * No usa authMiddleware porque el usuario todavía no tiene token.
 */
router.post('/login', AuthController.login);

/**
 * Ruta protegida de ejemplo.
 *
 * Método: GET
 * URL final: /api/users/mantenimientos/historial
 *
 * Flujo:
 * 1. Llega la petición.
 * 2. authMiddleware valida el token.
 * 3. Si el token es válido, se ejecuta esta función.
 * 4. Se responde con información del usuario autenticado.
 */
router.get('/mantenimientos/historial', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Acceso concedido.",
    datos: `Historial protegido procesado para el usuario con ID: ${req.user.id} y Rol: ${req.user.rol}`
  });
});

// Exporta las rutas para usarlas en server.js.
module.exports = router;