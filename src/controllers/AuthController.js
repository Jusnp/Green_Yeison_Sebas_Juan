// src/controllers/AuthController.js

// bcrypt permite comparar contraseñas usando hash.
const bcrypt = require('bcrypt');

// jsonwebtoken permite generar tokens JWT.
const jwt = require('jsonwebtoken');

/**
 * Controlador de autenticación.
 *
 * Responsabilidades:
 * - Recibir email y password.
 * - Simular búsqueda de usuario.
 * - Comparar contraseña con bcrypt.
 * - Generar JWT si las credenciales son correctas.
 */
class AuthController {
    // Secreto para firmar los tokens.
    // En producción debe venir desde variables de entorno.
    static SECRET_KEY = process.env.JWT_SECRET || "green_secret_2026";

    /**
     * Login del usuario.
     *
     * Ruta esperada:
     * POST /api/users/login
     *
     * Body:
     * {
     *   "email": "admin@green.com",
     *   "password": "admin123"
     * }
     */
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Simulación de usuario recuperado desde base de datos.
            // En una versión real se usaría UserRepository.findByEmail(email).
            const userSimulado = {
                id: 1,
                email: "admin@green.com",
                passwordHash: await bcrypt.hash("admin123", 10),
                rol: "admin"
            };

            // Compara la contraseña enviada con el hash guardado.
            const match = await bcrypt.compare(password, userSimulado.passwordHash);

            // Si el email y password coinciden, genera JWT.
            if (email === userSimulado.email && match) {
                const token = jwt.sign(
                    {
                        id: userSimulado.id,
                        rol: userSimulado.rol
                    },
                    AuthController.SECRET_KEY,
                    {
                        expiresIn: '2h'
                    }
                );

                return res.status(200).json({
                    message: "Autenticación exitosa",
                    token: token
                });
            }

            return res.status(401).json({
                message: "Credenciales inválidas"
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error en el servidor"
            });
        }
    }
}

module.exports = AuthController;