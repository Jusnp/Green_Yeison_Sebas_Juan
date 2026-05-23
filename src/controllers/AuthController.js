// src/controllers/AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "green_secret_2026";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "green_refresh_secret_2026";

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "El correo electrónico y la contraseña son obligatorios."
        });
      }

      // Usuario admin simulado para el laboratorio
      const passwordHashSimulado = await bcrypt.hash("admin123", 10);

      const userInDB = {
        id: 101,
        nombre: "Yeison Areiza",
        email: "admin@green.com",
        passwordHash: passwordHashSimulado,
        rol: "admin"
      };

      if (email !== userInDB.email) {
        return res.status(401).json({
          success: false,
          message: "Credenciales incorrectas o usuario no encontrado."
        });
      }

      const isMatch = await bcrypt.compare(password, userInDB.passwordHash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Credenciales incorrectas o usuario no encontrado."
        });
      }

      const accessToken = jwt.sign(
        {
          id: userInDB.id,
          rol: userInDB.rol,
          email: userInDB.email
        },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        {
          id: userInDB.id
        },
        REFRESH_SECRET,
        { expiresIn: "7d" }
      );

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