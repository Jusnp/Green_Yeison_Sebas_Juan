// src/services/ReportService.js
class ReportService {
  static async getResumenMantenimientos() {
    // Simulación de consulta pesada a base de datos
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