import pg from 'pg';
import {DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT} from './config.js'

const { Pool } = pg;

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err))