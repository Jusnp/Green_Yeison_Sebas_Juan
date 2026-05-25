// src/middleware/requestLogger.js
const logger = require("../config/logger");

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request completed", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip
    });
  });

  next();
}

module.exports = requestLogger;