// src/middleware/authMiddleware.js

// jsonwebtoken permite verificar y decodificar tokens JWT.
const jwt = require('jsonwebtoken');

// Clave secreta usada para validar el accessToken.
// Debe ser la misma clave con la que AuthController firma el accessToken.
const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";

/**
 * Middleware de autenticación.
 *
 * Este middleware protege rutas privadas.
 *
 * Se ejecuta ANTES del controlador.
 *
 * Flujo:
 * 1. Lee el header Authorization.
 * 2. Extrae el token del formato Bearer <TOKEN>.
 * 3. Si no hay token, responde 401.
 * 4. Si hay token, lo verifica con JWT_SECRET.
 * 5. Si es válido, guarda la información del usuario en req.user.
 * 6. Llama next() para permitir llegar al controlador.
 * 7. Si el token es inválido o expiró, responde 403.
 */
const authMiddleware = (req, res, next) => {
  // Obtiene el header Authorization.
  const authHeader = req.headers['authorization'];

  // El token normalmente llega así:
  // Authorization: Bearer eyJhbGciOi...
  // Por eso se divide por espacio y se toma la segunda parte.
  const token = authHeader && authHeader.split(' ')[1];

  // Si no hay token, se bloquea el acceso.
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. Token de autenticación no proporcionado en los headers."
    });
  }

  try {
    // Verifica que el token sea válido y que no haya expirado.
    const decoded = jwt.verify(token, JWT_SECRET);

    // Guarda los datos decodificados del token en req.user.
    // Esto permite que las rutas protegidas sepan quién hizo la petición.
    req.user = decoded;

    // Permite continuar hacia el controlador o función final de la ruta.
    next();
  } catch (error) {
    // Si el token es inválido, fue alterado o expiró, se rechaza.
    console.error("Falla en la validación del Token:", error.message);

    return res.status(403).json({
      success: false,
      message: "Token inválido, alterado o expirado. Acceso denegado."
    });
  }
};

// Exporta el middleware para usarlo en rutas protegidas.
module.exports = authMiddleware;