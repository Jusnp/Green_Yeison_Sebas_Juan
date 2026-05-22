// src/services/UserRepository.js
// Nota: Aquí simulamos la interfaz IUserRepository requerida por el lab.

class UserRepository {
  constructor(dbConnection) {
    this.db = dbConnection; // Inyección de dependencia
  }

  /**
   * Guarda un usuario en la base de datos MySQL.
   */
  async save(user) {
    try {
      const query = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
      const values = [user.nombre, user.email, user.password, user.rol];

      // Aquí se ejecutaría la consulta real:
      // const [result] = await this.db.execute(query, values);

      console.log(`[DB] Usuario ${user.email} guardado exitosamente.`);
      return { id: Date.now(), ...user };
    } catch (error) {
      console.error("Error en UserRepository:", error.message);
      throw new Error("Error al persistir el usuario en la base de datos.");
    }
  }

  async findByEmail(email) {
    console.log(`[DB] Buscando usuario por email: ${email}`);

    // Simulación de búsqueda
    return null;
  }
}

module.exports = UserRepository;