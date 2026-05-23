// src/controllers/AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secreto para firmar los tokens (Táctica de Seguridad)
// En producción esto debe provenir de variables de entorno (process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "green_refresh_secret_2026";

class AuthController {
    /**
     * Maneja el inicio de sesión de los usuarios del sistema.
     * @param {Object} req - Petición HTTP (contiene email y password en el body).
     * @param {Object} res - Respuesta HTTP.
     */
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Validación básica de entrada
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "El correo electrónico y la contraseña son obligatorios."
                });
            }

            // Simulación de usuario recuperado de la Base de Datos mediante el repositorio.
            // Para la demo, asumimos que el usuario "admin@green.com" ya está registrado con la clave "admin123"
            // Generamos un hash real con un factor de costo de 10 como lo exige el diseño arquitectónico.
            const passwordHashSimulado = await bcrypt.hash("admin123", 10);

            const userInDB = {
                id: 101,
                nombre: "Yeison Areiza",
                email: "admin@green.com",
                passwordHash: passwordHashSimulado,
                rol: "admin" // Roles permitidos: admin, tecnico, cliente
            };

            // 1. Verificar existencia del usuario
            if (email !== userInDB.email) {
                return res.status(401).json({
                    success: false,
                    message: "Credenciales incorrectas o usuario no encontrado."
                });
            }

            // 2. Táctica de Seguridad: Comparación del hash usando bcrypt
            const isMatch = await bcrypt.compare(password, userInDB.passwordHash);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Credenciales incorrectas o usuario no encontrado."
                });
            }

            // 3. Generación de Access Token (Vida corta: 15 minutos para peticiones seguras)
            const accessToken = jwt.sign(
                { id: userInDB.id, rol: userInDB.rol, email: userInDB.email },
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            // 4. Generación de Refresh Token (Vida larga: 7 días para persistir sesión sin re-login)
            const refreshToken = jwt.sign(
                { id: userInDB.id },
                REFRESH_SECRET,
                { expiresIn: '7d' }
            );

            // Respuesta exitosa (Código 200 OK)
            return res.status(200).json({
                success: true,
                message: "Autenticación satisfactoria en Green Mantenimientos",
                accessToken,
                refreshToken,
                user: {
                    id: userInDB.id,
                    nombre: userInDB.nombre,
                    rol: userInDB.rol
                }
            });

        } catch (error) {
            console.error("Error en AuthController:", error.message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor al procesar la autenticación."
            });
        }
    }
}

module.exports = AuthController;
