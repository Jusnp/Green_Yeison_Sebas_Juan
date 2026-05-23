class UserValidator {
    /**
     * Valida los datos para el registro de un nuevo usuario en Green Mantenimientos.
     * @param {Object} userData - Datos del usuario (nombre, email, password, rol).
     * @returns {Object} - { isValid: boolean, errors: string[] }
     */
    static validateRegistration(userData) {
        const errors = [];
        const { nombre, email, password, rol } = userData;

        // Validación de nombre
        if (!nombre || nombre.trim().length < 3) {
            errors.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
        }

        // Validación de email (Formato correcto)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push("Debe proporcionar un correo electrónico válido.");
        }

        // Validación de password (Mínimo 8 caracteres, según ADR-002)
        if (!password || password.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres.");
        }

        // Validación de Rol (Solo roles permitidos en el sistema)
        const rolesValidos = ['admin', 'tecnico', 'cliente'];
        if (!rol || !rolesValidos.includes(rol)) {
            errors.push("El rol seleccionado no es válido.");
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
module.exports = UserValidator;

