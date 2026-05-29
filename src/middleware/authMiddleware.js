// src/middleware/authMiddleware.js

// Importa jsonwebtoken para verificar tokens JWT.
const jwt = require('jsonwebtoken');

// Clave secreta usada para validar el token.
// Debe coincidir con la clave usada para firmar el token en AuthController.
const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";

/**
 * Middleware para proteger rutas privadas mediante JWT.
 *
 * Este middleware se ejecuta antes del controlador.
 *
 * Flujo:
 * 1. Lee el header Authorization.
 * 2. Extrae el token del formato Bearer <TOKEN>.
 * 3. Si no hay token, responde 401.
 * 4. Si hay token, lo verifica con jwt.verify().
 * 5. Si el token es válido, guarda los datos en req.user.
 * 6. Llama next() para permitir continuar al controlador.
 * 7. Si el token es inválido o expiró, responde 403.
 */
const authMiddleware = (req, res, next) => {
    // Obtener el encabezado Authorization.
    const authHeader = req.headers['authorization'];

    // El token viene normalmente como: Bearer <TOKEN>
    const token = authHeader && authHeader.split(' ')[1];

    // Si no se envía token, se niega el acceso.
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Acceso denegado. Token de autenticación no proporcionado en los headers."
        });
    }

    try {
        // Verifica y decodifica el token.
        const decoded = jwt.verify(token, JWT_SECRET);

        // Guarda los datos del usuario autenticado en la petición.
        // Esto permite usar req.user.id o req.user.rol en rutas protegidas.
        req.user = decoded;

        // Continúa hacia el controlador o función final de la ruta.
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