// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta Pública: Login
router.post('/login', AuthController.login);

// Ruta Protegida de Ejemplo
router.get('/mantenimientos/historial', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Acceso concedido.",
    datos: `Historial protegido procesado para el usuario con ID: ${req.user.id} y Rol: ${req.user.rol}`
  });
});

module.exports = router;