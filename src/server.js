// src/server.js
const express = require("express");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(express.json());

app.use("/api/reportes", reportRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Green Mantenimientos API",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});