// src/controllers/AuthController.js

// bcrypt permite comparar contraseñas de forma segura usando hashing.
const bcrypt = require('bcrypt');

// jsonwebtoken permite generar tokens JWT para autenticación.
const jwt = require('jsonwebtoken');

/**
 * Controlador encargado de la autenticación.
 *
 * Responsabilidades:
 * - Recibir email y password.
 * - Simular la búsqueda de un usuario en base de datos.
 * - Comparar la contraseña con bcrypt.
 * - Generar un token JWT si las credenciales son válidas.
 */
class AuthController {
    // Secreto para firmar los tokens.
    // En producción debe venir desde variables de entorno.
    static SECRET_KEY = "green_secret_2026";

    /**
     * Login del usuario.
     *
     * Ruta esperada:
     * POST /api/users/login
     *
     * Body esperado:
     * {
     *   "email": "admin@green.com",
     *   "password": "admin123"
     * }
     */
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            /**
             * Simulación de usuario recuperado de base de datos.
             *
             * En una implementación real se usaría UserRepository:
             * const user = await userRepository.findByEmail(email);
             */
            const userSimulado = {
                id: 1,
                email: "admin@green.com",
                passwordHash: await bcrypt.hash("admin123", 10),
                rol: "admin"
            };

            // Compara la contraseña enviada con el hash almacenado.
            const match = await bcrypt.compare(password, userSimulado.passwordHash);

            // Si el correo y la contraseña coinciden, se genera el JWT.
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

            // Si las credenciales no coinciden, se rechaza el login.
            return res.status(401).json({
                message: "Credenciales inválidas"
            });

        } catch (error) {
            // Error interno del servidor.
            return res.status(500).json({
                message: "Error en el servidor"
            });
        }
    }
}

module.exports = AuthController;