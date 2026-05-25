// src/server.js
const express = require("express");
const { metricsMiddleware, register } = require("./middleware/metricsMiddleware");

const app = express();

app.use(express.json());
app.use(metricsMiddleware);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    service: "Green Mantenimientos API"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});