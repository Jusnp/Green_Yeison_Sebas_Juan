// src/services/UserRepository.js

// Nota: Aquí simulamos la interfaz IUserRepository requerida por el laboratorio.

/**
 * Repositorio de usuarios.
 *
 * Responsabilidad:
 * - Guardar usuarios.
 * - Buscar usuarios por correo.
 * - Encapsular el acceso a la base de datos.
 *
 * Este archivo aplica SRP porque solo se encarga de persistencia.
 */
class UserRepository {
    /**
     * Constructor del repositorio.
     *
     * Recibe la conexión de base de datos desde afuera.
     * Esto aplica inyección de dependencias.
     *
     * @param {Object} dbConnection - Conexión a la base de datos.
     */
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    /**
     * Guarda un usuario en la base de datos.
     *
     * Actualmente está simulado.
     * En una versión real se ejecutaría la consulta con this.db.execute().
     *
     * @param {Object} user - Usuario a guardar.
     * @returns {Object} Usuario guardado con id simulado.
     */
    async save(user) {
        try {
            const query = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
            const values = [user.nombre, user.email, user.password, user.rol];

            // Aquí se ejecutaría la consulta real:
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
     * Busca un usuario por correo electrónico.
     *
     * Se puede usar para login o para verificar usuarios duplicados.
     *
     * @param {string} email - Correo del usuario.
     * @returns {Object|null} Usuario encontrado o null.
     */
    async findByEmail(email) {
        console.log(`[DB] Buscando usuario por email: ${email}`);

        // Simulación de búsqueda.
        return null;
    }
}

module.exports = UserRepository;