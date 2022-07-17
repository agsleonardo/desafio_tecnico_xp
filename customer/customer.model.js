const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'customer',
});

const getById = async (id) => {
  const [[rows]] = await connection.query('SELECT * FROM customer WHERE id = ?', [id]);
  return rows;
};

const create = async ({ email, username, password }) => {
  const [[rows]] = await connection.query('INSERT INTO customer (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
  return rows;
};

module.exports = {
  getById,
  create,
};
