// src/controllers/AuthController.js

// bcrypt se usa para comparar contraseñas de forma segura usando hashing.
// En vez de comparar texto plano, compara la contraseña enviada con un hash.
const bcrypt = require('bcrypt');

// jsonwebtoken se usa para generar tokens JWT.
// Estos tokens permiten autenticar usuarios en rutas protegidas.
const jwt = require('jsonwebtoken');

// Clave secreta para firmar el accessToken.
// En producción debe venir desde variables de entorno.
const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";

// Clave secreta para firmar el refreshToken.
// Se usa para mantener la sesión por más tiempo sin pedir login nuevamente.
const REFRESH_SECRET = process.env.REFRESH_SECRET || "green_refresh_secret_2026";

/**
 * Controlador encargado de la autenticación de usuarios.
 *
 * Responsabilidades:
 * - Recibir email y password.
 * - Validar que los datos existan.
 * - Simular la búsqueda del usuario en base de datos.
 * - Comparar la contraseña usando bcrypt.
 * - Generar accessToken y refreshToken usando JWT.
 * - Responder al cliente con los tokens si el login es correcto.
 */
class AuthController {
  /**
   * Método de inicio de sesión.
   *
   * Ruta:
   * POST /api/users/login
   *
   * Body esperado:
   * {
   *   "email": "admin@green.com",
   *   "password": "admin123"
   * }
   */
  static async login(req, res) {
    // Extrae las credenciales enviadas en el body.
    const { email, password } = req.body;

    try {
      // Validación básica de entrada.
      // Si falta email o password, no se continúa con el proceso.
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "El correo electrónico y la contraseña son obligatorios."
        });
      }

      // Usuario admin simulado para el laboratorio.
      // En una aplicación real, este usuario se buscaría con UserRepository:
      // const userInDB = await userRepository.findByEmail(email);
      const passwordHashSimulado = await bcrypt.hash("admin123", 10);

      const userInDB = {
        id: 101,
        nombre: "Yeison Areiza",
        email: "admin@green.com",
        passwordHash: passwordHashSimulado,
        rol: "admin"
      };

      // Verifica si el correo existe.
      // Si el email no coincide, se responde con 401 Unauthorized.
      if (email !== userInDB.email) {
        return res.status(401).json({
          success: false,
          message: "Credenciales incorrectas o usuario no encontrado."
        });
      }

      // Compara la contraseña enviada con el hash guardado.
      // bcrypt.compare retorna true si la contraseña es correcta.
      const isMatch = await bcrypt.compare(password, userInDB.passwordHash);

      // Si la contraseña no coincide, se rechaza el acceso.
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Credenciales incorrectas o usuario no encontrado."
        });
      }

      // Genera el Access Token.
      // Vida corta: 15 minutos.
      // Este token se usa para entrar a rutas protegidas.
      const accessToken = jwt.sign(
        {
          id: userInDB.id,
          rol: userInDB.rol,
          email: userInDB.email
        },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      // Genera el Refresh Token.
      // Vida larga: 7 días.
      // Sirve para renovar sesión sin volver a iniciar sesión.
      const refreshToken = jwt.sign(
        {
          id: userInDB.id
        },
        REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Respuesta exitosa.
      // Se devuelve el accessToken, refreshToken y datos básicos del usuario.
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
      // Manejo de errores inesperados.
      console.error("Error en AuthController:", error.message);

      return res.status(500).json({
        success: false,
        message: "Error interno del servidor al procesar la autenticación."
      });
    }
  }
}

// Exporta el controlador para usarlo en las rutas.
module.exports = AuthController;