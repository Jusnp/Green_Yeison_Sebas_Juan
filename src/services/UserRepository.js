// src/services/UserRepository.js

// Nota: Aquí simulamos la interfaz IUserRepository requerida por el laboratorio.

/**
 * Repositorio encargado de la persistencia de usuarios.
 *
 * Responsabilidad:
 * - Guardar usuarios.
 * - Buscar usuarios por correo.
 * - Encapsular el acceso a la base de datos.
 *
 * Este archivo aplica SRP porque solo maneja persistencia.
 * No valida datos, no envía correos y no maneja peticiones HTTP.
 */
class UserRepository {
  /**
   * Constructor del repositorio.
   *
   * @param {Object} dbConnection - Conexión a la base de datos.
   *
   * La conexión se recibe desde afuera.
   * Esto aplica inyección de dependencias y facilita cambiar la base de datos.
   */
  constructor(dbConnection) {
    this.db = dbConnection;
  }

  /**
   * Guarda un usuario en la base de datos.
   *
   * En esta versión se simula la ejecución real de la consulta.
   * En producción se usaría this.db.execute(query, values).
   *
   * @param {Object} user - Usuario a guardar.
   * @param {string} user.nombre - Nombre del usuario.
   * @param {string} user.email - Correo del usuario.
   * @param {string} user.password - Contraseña del usuario.
   * @param {string} user.rol - Rol del usuario.
   * @returns {Object} Usuario guardado con id simulado.
   */
  async save(user) {
    try {
      // Consulta preparada para insertar un usuario.
      const query = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";

      // Valores que se insertarían en la base de datos.
      const values = [user.nombre, user.email, user.password, user.rol];

      // Consulta real simulada:
      // const [result] = await this.db.execute(query, values);

      console.log(`[DB] Usuario ${user.email} guardado exitosamente.`);

      // Retorna el usuario con un id simulado.
      return {
        id: Date.now(),
        ...user
      };
    } catch (error) {
      console.error("Error en UserRepository:", error.message);

      throw new Error("Error al persistir el usuario en la base de datos.");
    }
  }

  /**
   * Busca un usuario por correo electrónico.
   *
   * Este método sirve para login o para evitar registros duplicados.
   *
   * @param {string} email - Correo del usuario.
   * @returns {Object|null} Usuario encontrado o null si no existe.
   */
  async findByEmail(email) {
    console.log(`[DB] Buscando usuario por email: ${email}`);

    // Simulación de búsqueda.
    // En una implementación real:
    // const [rows] = await this.db.execute(
    //   "SELECT * FROM usuarios WHERE email = ?",
    //   [email]
    // );
    // return rows[0] || null;

    return null;
  }
}

module.exports = UserRepository;