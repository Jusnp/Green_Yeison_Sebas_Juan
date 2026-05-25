// src/middleware/metricsMiddleware.js
const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total de peticiones HTTP recibidas",
  labelNames: ["method", "route", "status_code"]
});

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