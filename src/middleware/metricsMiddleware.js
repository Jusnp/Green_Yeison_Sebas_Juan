// src/middleware/metricsMiddleware.js
const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total de peticiones HTTP recibidas",
  labelNames: ["method", "route", "status_code"]
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de las peticiones HTTP en segundos",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

function metricsMiddleware(req, res, next) {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    const route = req.route ? req.route.path : req.originalUrl;

    httpRequestCounter.inc({
      method: req.method,
      route,
      status_code: res.statusCode
    });

    end({
      method: req.method,
      route,
      status_code: res.statusCode
    });
  });

  next();
}

module.exports = {
  metricsMiddleware,
  register: client.register
};