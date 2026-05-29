// src/services/EmailService.js

/**
 * Servicio encargado del envío de correos.
 *
 * Aplica el principio de Responsabilidad Única de SOLID porque
 * solo se encarga de notificaciones por correo.
 *
 * No valida usuarios.
 * No guarda usuarios.
 * No maneja rutas HTTP.
 */
class EmailService {
  /**
   * Simula el envío de un correo electrónico.
   *
   * En una aplicación real, aquí se integraría un proveedor como:
   * Nodemailer, SendGrid, Mailgun o Amazon SES.
   *
   * @param {string} to - Correo del destinatario.
   * @param {string} subject - Asunto del mensaje.
   * @param {string} body - Cuerpo del mensaje.
   * @returns {Promise<boolean>} Retorna true cuando el envío fue exitoso.
   */
  async sendEmail(to, subject, body) {
    console.log(`[EmailService] Iniciando envío de correo a: ${to}...`);

    // Simulación de delay de red.
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`-----------------------------------------`);
        console.log(`DE: notifications@greenmantenimientos.com`);
        console.log(`PARA: ${to}`);
        console.log(`ASUNTO: ${subject}`);
        console.log(`MENSAJE: ${body}`);
        console.log(`-----------------------------------------`);
        console.log(`[EmailService] Correo enviado con éxito.`);

        resolve(true);
      }, 1000);
    });
  }

  /**
   * Envía un correo de bienvenida a un usuario nuevo.
   *
   * Este método reutiliza sendEmail para evitar duplicar lógica.
   *
   * @param {string} userEmail - Correo del usuario.
   * @param {string} userName - Nombre del usuario.
   * @returns {Promise<boolean>} Resultado del envío.
   */
  async sendWelcomeEmail(userEmail, userName) {
    const body = `Hola ${userName}, bienvenido a Green Mantenimientos. Tu cuenta ha sido creada exitosamente.`;

    return await this.sendEmail(
      userEmail,
      "Bienvenido al Sistema Green",
      body
    );
  }
}

module.exports = EmailService;s