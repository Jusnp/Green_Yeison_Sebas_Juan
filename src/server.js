// src/server.js
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Green Mantenimientos API"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});