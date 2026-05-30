// src/services/UserRepository.js

// Nota: Aquí simulamos la interfaz IUserRepository requerida por el laboratorio.

/**
 * Repositorio de usuarios.
 *
 * Este archivo representa la capa de persistencia.
 *
 * Responsabilidades:
 * - Guardar usuarios.
 * - Buscar usuarios por email.
 * - Encapsular consultas a base de datos.
 *
 * Aplica SRP porque no valida datos, no maneja HTTP y no envía correos.
 */
class UserRepository {
    /**
     * Recibe la conexión de base de datos desde afuera.
     *
     * Esto aplica inyección de dependencias.
     */
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    /**
     * Guarda un usuario.
     *
     * Actualmente la consulta está simulada.
     */
    async save(user) {
        try {
            const query = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
            const values = [user.nombre, user.email, user.password, user.rol];

            // Consulta real simulada:
            // const [result] = await this.db.execute(query, values);

            console.log(`[DB] Usuario ${user.email} guardado exitosamente.`);

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
     * Busca un usuario por email.
     *
     * Puede usarse para login o para evitar usuarios duplicados.
     */
    async findByEmail(email) {
        console.log(`[DB] Buscando usuario por email: ${email}`);

        // Simulación de búsqueda.
        return null;
    }
}

module.exports = UserRepository;