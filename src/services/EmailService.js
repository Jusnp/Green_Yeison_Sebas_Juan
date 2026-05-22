// src/services/EmailService.js
class EmailService {
  /**
   * Envía un correo de bienvenida o notificación de servicio.
   * @param {string} to - Correo del destinatario.
   * @param {string} subject - Asunto del mensaje.
   */
  async sendEmail(to, subject, body) {
    console.log(`[EmailService] Iniciando envío de correo a: ${to}...`);

    // Simulación de delay de red
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

  async sendWelcomeEmail(userEmail, userName) {
    const body = `Hola ${userName}, bienvenido a Green Mantenimientos. Tu cuenta ha sido creada exitosamente.`;
    return await this.sendEmail(userEmail, "Bienvenido al Sistema Green", body);
  }
}

module.exports = EmailService;