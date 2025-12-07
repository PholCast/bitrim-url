import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "bitrimUrl",
  password: process.env.DB_PASSWORD || "tu_password",
  port: process.env.DB_PORT || 5432
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Error connecting to PostgreSQL:", err))