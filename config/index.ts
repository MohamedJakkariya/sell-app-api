import { config } from 'dotenv';
import Logger from 'js-logger';
import mysql from 'mysql';

// Set env configuration
config();

const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

Logger.info('db hostname', DB_HOSTNAME);

const pool = mysql.createPool({
  host: DB_HOSTNAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT ? +DB_PORT : 3306,
  database: DB_NAME,
  acquireTimeout: 20000,
  multipleStatements: true,
  connectionLimit: 100,
  charset: 'utf8mb4',
  debug: false
});

export default pool;
