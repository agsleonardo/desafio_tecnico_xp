const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
});

async function recreateDatabase() {
  try {
    const importPath = path.resolve(__dirname, 'customer.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((p) => p.trim());
    const inserts = queries.pop();
    const createTable = queries.pop();
    const queriesPromises = queries.map(async (query) => connection.query(query));
    await Promise.all(queriesPromises)
      .then(() => connection.query(createTable))
      .then(() => connection.query(inserts));
    process.stdout.write('\nDatabase inciado...\n');
    return '\nDatabase inciado...\n';
  } catch (error) {
    process.stdout.write(`\nFalha em restaurar o Banco. ${error}\n`);
    return recreateDatabase();
  }
}

const getById = async (id) => {
  const [[rows]] = await connection.query('SELECT id, email, username FROM Customer_db.Customer WHERE id = ?', [id]);
  return rows;
};

const getByEmail = async (email) => {
  const [[rows]] = await connection.query('SELECT * FROM Customer_db.Customer WHERE email = ?', [email]);
  return rows;
};

const create = async (email, username, password) => {
  const [{ insertId }] = await connection.query('INSERT INTO Customer_db.Customer (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
  return insertId;
};

module.exports = {
  getById,
  create,
  getByEmail,
  recreateDatabase,
};
