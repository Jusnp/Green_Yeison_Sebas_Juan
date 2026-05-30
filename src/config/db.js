// src/config/db.js

// Importa Pool desde pg.
// Pool permite manejar conexiones reutilizables a PostgreSQL.
const { Pool } = require("pg");

/**
 * Configuración de conexión a PostgreSQL.
 *
 * Los valores se toman desde variables de entorno cuando existen.
 * Si no existen, se usan valores por defecto para desarrollo local o Docker.
 *
 * Variables esperadas:
 * DB_HOST
 * DB_PORT
 * DB_USER
 * DB_PASSWORD
 * DB_NAME
 */
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "green_user",
  password: process.env.DB_PASSWORD || "green_password",
  database: process.env.DB_NAME || "green_mantenimientos"
});

// Exporta el pool para usarlo en controladores como HealthController.
module.exports = pool;