// src/services/EmailService.js

/**
 * Servicio de correo electrónico.
 *
 * Su responsabilidad es enviar notificaciones.
 * Aplica SRP porque solo se encarga de correos.
 */
class EmailService {
  /**
   * Simula el envío de un correo electrónico.
   *
   * En producción podría conectarse con Nodemailer, SendGrid,
   * Mailgun u otro proveedor de correo.
   */
  async sendEmail(to, subject, body) {
    console.log(`[EmailService] Iniciando envío de correo a: ${to}...`);

    // Simula un delay de red de 1 segundo.
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
   * Envía un correo de bienvenida.
   *
   * Reutiliza sendEmail para no duplicar lógica.
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

module.exports = EmailService;