// src/controllers/AuthController.js

// Librería usada para comparar contraseñas de forma segura mediante hashing.
const bcrypt = require('bcrypt');

// Librería usada para generar y verificar JSON Web Tokens.
const jwt = require('jsonwebtoken');

/**
 * Controlador de autenticación.
 *
 * Este controlador se encarga del proceso de login de usuarios.
 * Su responsabilidad principal es:
 * 1. Recibir email y password desde la petición HTTP.
 * 2. Buscar o simular un usuario registrado.
 * 3. Comparar la contraseña enviada con el hash almacenado.
 * 4. Generar un token JWT si las credenciales son correctas.
 * 5. Responder con error si las credenciales son inválidas.
 */
class AuthController {
    /**
     * Clave secreta para firmar los tokens JWT.
     *
     * En producción esta clave NO debería estar escrita directamente en el código.
     * Lo correcto sería usar variables de entorno:
     *
     * process.env.JWT_SECRET
     */
    static SECRET_KEY = "green_secret_2026";

    /**
     * Método de login.
     *
     * Ruta asociada:
     * POST /api/users/login
     *
     * Body esperado:
     * {
     *   "email": "admin@green.com",
     *   "password": "admin123"
     * }
     *
     * @param {Object} req - Objeto de petición HTTP.
     * @param {Object} req.body - Cuerpo de la petición.
     * @param {string} req.body.email - Correo del usuario.
     * @param {string} req.body.password - Contraseña del usuario.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} Respuesta JSON con token o mensaje de error.
     */
    static async login(req, res) {
        // Extrae las credenciales enviadas por el cliente.
        const { email, password } = req.body;

        try {
            /**
             * Simulación de búsqueda en base de datos.
             *
             * En una aplicación real, aquí se debería usar UserRepository:
             *
             * const user = await userRepository.findByEmail(email);
             *
             * Para el laboratorio, se crea un usuario simulado con:
             * - id
             * - email
             * - passwordHash
             * - rol
             */
            const userSimulado = {
                id: 1,
                email: "admin@green.com",

                // Se genera un hash seguro para la contraseña "admin123".
                // bcrypt aplica salt automáticamente.
                passwordHash: await bcrypt.hash("admin123", 10),

                // Rol del usuario autenticado.
                rol: "admin"
            };

            /**
             * Comparación segura de contraseña.
             *
             * bcrypt.compare compara:
             * - password: contraseña enviada por el usuario.
             * - userSimulado.passwordHash: hash almacenado.
             *
             * Retorna true si coinciden.
             */
            const match = await bcrypt.compare(password, userSimulado.passwordHash);

            /**
             * Validación de credenciales.
             *
             * Se revisa que:
             * 1. El email enviado coincida con el email del usuario simulado.
             * 2. La contraseña enviada coincida con el hash.
             */
            if (email === userSimulado.email && match) {
                /**
                 * Generación del token JWT.
                 *
                 * El payload incluye:
                 * - id del usuario.
                 * - rol del usuario.
                 *
                 * Este token será usado después por authMiddleware.js
                 * para permitir o rechazar acceso a rutas protegidas.
                 */
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

                // Respuesta exitosa con el token generado.
                return res.status(200).json({
                    message: "Autenticación exitosa",
                    token: token
                });
            }

            // Si el email o la contraseña no coinciden, se rechaza el login.
            return res.status(401).json({
                message: "Credenciales inválidas"
            });

        } catch (error) {
            // Error inesperado del servidor.
            return res.status(500).json({
                message: "Error en el servidor"
            });
        }
    }
}

// Exporta el controlador para usarlo en userRoutes.js.
module.exports = AuthController;