// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";

/**
 * Middleware para proteger rutas mediante verificación de JSON Web Tokens (JWT).
 */
const authMiddleware = (req, res, next) => {
  // 1. Obtener el encabezado de autorización
  const authHeader = req.headers['authorization'];

  // El token viene usualmente en formato: "Bearer <TOKEN>"
  const token = authHeader && authHeader.split(' ')[1];

  // Táctica de Seguridad: Denegar acceso directo si no se envía el token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. Token de autenticación no proporcionado en los headers."
    });
  }

  try {
    // 2. Verificar y decodificar el token con la clave secreta del sistema
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Inyectar los datos del usuario autenticado en el objeto request
    req.user = decoded;

    // 4. Dar paso al siguiente componente o controlador
    next();
  } catch (error) {
    console.error("Falla en la validación del Token:", error.message);

    return res.status(403).json({
      success: false,
      message: "Token inválido, alterado o expirado. Acceso denegado."
    });
  }
};

module.exports = authMiddleware;