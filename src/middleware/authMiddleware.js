// src/middleware/authMiddleware.js

// Importa jsonwebtoken para verificar tokens JWT.
const jwt = require('jsonwebtoken');

// Clave secreta usada para validar el token.
// Debe coincidir con la clave usada en AuthController.
const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";

/**
 * Middleware para proteger rutas mediante JWT.
 *
 * Este middleware se ejecuta antes del controlador.
 * Si el token es válido, permite continuar con next().
 * Si no hay token, responde 401.
 * Si el token es inválido o expiró, responde 403.
 */
const authMiddleware = (req, res, next) => {
  // Obtiene el header Authorization.
  const authHeader = req.headers['authorization'];

  // Extrae el token del formato: Bearer <TOKEN>
  const token = authHeader && authHeader.split(' ')[1];

  // Si no se envió token, se niega el acceso.
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. Token de autenticación no proporcionado en los headers."
    });
  }

  try {
    // Verifica que el token sea válido y no esté alterado.
    const decoded = jwt.verify(token, JWT_SECRET);

    // Guarda los datos del usuario en la petición.
    // Luego pueden usarse en el controlador con req.user.
    req.user = decoded;

    // Permite continuar hacia el controlador.
    next();
  } catch (error) {
    console.error("Falla en la validación del Token:", error.message);

    // Si el token es inválido, alterado o expirado, se rechaza.
    return res.status(403).json({
      success: false,
      message: "Token inválido, alterado o expirado. Acceso denegado."
    });
  }
};

module.exports = authMiddleware;