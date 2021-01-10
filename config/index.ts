/** @format */
import mysql from 'mysql';

const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

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
