// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. Token de autenticación no proporcionado en los headers."
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

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