// src/services/ReportService.js

/**
 * Servicio de reportes.
 *
 * Este servicio simula una consulta pesada a base de datos.
 * En una aplicación real, aquí se consultarían tablas relacionadas con:
 * - mantenimientos
 * - clientes
 * - reportes ambientales
 * - impacto ecológico
 */
class ReportService {
  /**
   * Obtiene un resumen de mantenimientos.
   *
   * Se usa setTimeout para simular una operación lenta.
   * Esto permite demostrar por qué Redis mejora el rendimiento.
   *
   * @returns {Promise<Object>} Resumen de mantenimientos.
   */
  static async getResumenMantenimientos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalMantenimientos: 1250,
          mantenimientosPendientes: 84,
          mantenimientosCompletados: 1166,
          impactoAmbientalReducidoKgCO2: 3420,
          generatedAt: new Date().toISOString()
        });
      }, 800);
    });
  }
}

module.exports = ReportService;