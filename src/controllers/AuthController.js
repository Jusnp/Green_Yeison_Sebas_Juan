// src/controllers/AuthController.js

// bcrypt permite comparar contraseñas usando hash.
// Esto evita trabajar con contraseñas en texto plano.
const bcrypt = require('bcrypt');

// jsonwebtoken permite generar tokens JWT para autenticar usuarios.
const jwt = require('jsonwebtoken');

class AuthController {
    // Clave secreta usada para firmar los tokens.
    // En producción debe venir desde variables de entorno.
    static SECRET_KEY = process.env.JWT_SECRET || "green_secret_2026";

    /**
     * Controlador para iniciar sesión.
     *
     * Ruta:
     * POST /api/users/login
     *
     * Body esperado:
     * {
     *   "email": "admin@green.com",
     *   "password": "admin123"
     * }
     *
     * Responsabilidad:
     * - Recibir credenciales.
     * - Simular búsqueda de usuario.
     * - Comparar contraseña con bcrypt.
     * - Generar JWT si las credenciales son válidas.
     */
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Simulación de usuario recuperado desde la base de datos.
            // En un caso real se usaría:
            // const user = await userRepository.findByEmail(email);
            const userSimulado = {
                id: 1,
                email: "admin@green.com",
                passwordHash: await bcrypt.hash("admin123", 10),
                rol: "admin"
            };

            // Compara la contraseña recibida con el hash guardado.
            const match = await bcrypt.compare(password, userSimulado.passwordHash);

            // Si el correo y la contraseña son correctos, se genera el token.
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
            // Respuesta genérica para errores internos.
            return res.status(500).json({
                message: "Error en el servidor"
            });
        }
    }
}

module.exports = AuthController;