// src/services/UserRepository.js

/**
 * Repositorio de usuarios.
 *
 * Su responsabilidad es manejar la persistencia de datos de usuarios.
 * Aplica SRP porque solo se encarga de guardar y consultar usuarios.
 *
 * No valida datos.
 * No maneja rutas HTTP.
 * No envía correos.
 */

// Nota: Aquí simulamos la interfaz IUserRepository requerida por el lab.
class UserRepository {
  /**
   * Recibe la conexión de base de datos desde afuera.
   *
   * Esto aplica inyección de dependencias.
   * Si mañana cambia la base de datos, se cambia la conexión o implementación,
   * sin afectar otros componentes.
   */
  constructor(dbConnection) {
    this.db = dbConnection;
  }

  /**
   * Guarda un usuario en la base de datos.
   *
   * En este laboratorio la consulta está simulada.
   * En una aplicación real se ejecutaría con this.db.execute().
   */
  async save(user) {
    try {
      const query = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
      const values = [user.nombre, user.email, user.password, user.rol];

      // Consulta real simulada:
      // const [result] = await this.db.execute(query, values);

      console.log(`[DB] Usuario ${user.email} guardado exitosamente.`);

      // Retorna el usuario con un id simulado.
      return { id: Date.now(), ...user };
    } catch (error) {
      console.error("Error en UserRepository:", error.message);
      throw new Error("Error al persistir el usuario en la base de datos.");
    }
  }

  /**
   * Busca un usuario por correo electrónico.
   *
   * Este método sirve para login o para evitar registros duplicados.
   */
  async findByEmail(email) {
    console.log(`[DB] Buscando usuario por email: ${email}`);

    // Simulación de búsqueda.
    return null;
  }
}

module.exports = UserRepository;