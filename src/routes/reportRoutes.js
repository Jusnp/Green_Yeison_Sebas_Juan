// src/routes/reportRoutes.js

// Importa Express para crear rutas.
const express = require("express");

// Crea un router para las rutas de reportes.
const router = express.Router();

// Importa el controlador de reportes.
const ReportController = require("../controllers/ReportController");

/**
 * Ruta para obtener el resumen de mantenimientos.
 *
 * Método:
 * GET
 *
 * URL final:
 * /api/reportes/resumen
 *
 * Esta ruta usa Cache-Aside con Redis.
 */
router.get("/resumen", ReportController.getResumen);

// Exporta las rutas para registrarlas en server.js.
module.exports = router;