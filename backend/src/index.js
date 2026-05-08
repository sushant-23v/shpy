import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'postgres';

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

const app = express();
app.use(cors({ origin: '*'}));
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 AS ok');
    return res.status(200).json({ status: 'ok', db: result.rows[0].ok === 1 ? 'ok' : 'unknown' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Database connection failed', error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id ASC');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
      [name, email]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    if (err && err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});

const shutdown = async () => {
  // eslint-disable-next-line no-console
  console.log('Shutting down server...');
  server.close(async () => {
    try {
      await pool.end();
    } catch (e) {
      // ignore
    }
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
