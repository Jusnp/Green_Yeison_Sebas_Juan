// src/routes/reportRoutes.js
const express = require("express");
const router = express.Router();

const ReportController = require("../controllers/ReportController");

router.get("/resumen", ReportController.getResumen);

module.exports = router;