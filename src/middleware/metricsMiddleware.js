// src/middleware/metricsMiddleware.js

// prom-client permite exponer métricas compatibles con Prometheus.
const client = require("prom-client");

/**
 * Recolecta métricas por defecto del proceso Node.js.
 *
 * Ejemplos:
 * - uso de memoria
 * - uso de CPU
 * - event loop
 * - garbage collector
 */
client.collectDefaultMetrics();

/**
 * Contador de peticiones HTTP.
 *
 * Esta métrica cuenta cuántas peticiones recibe el sistema.
 *
 * Labels:
 * - method: GET, POST, PUT, DELETE
 * - route: URL solicitada
 * - status_code: código HTTP de respuesta
 */
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total de peticiones HTTP recibidas",
  labelNames: ["method", "route", "status_code"]
});

/**
 * Middleware para registrar métricas HTTP.
 *
 * Se ejecuta en cada petición.
 * Cuando la respuesta termina, incrementa el contador.
 */
function metricsMiddleware(req, res, next) {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.originalUrl,
      status_code: res.statusCode
    });
  });

  next();
}

module.exports = {
  metricsMiddleware,
  register: client.register
};