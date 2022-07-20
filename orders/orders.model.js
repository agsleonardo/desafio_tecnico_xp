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
    const importPath = path.resolve(__dirname, 'orders.sql');
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
    return setTimeout(() => recreateDatabase(), 1000);
  }
}

const getByCustomerId = async (customerId) => {
  const [rows] = await connection.query('SELECT * FROM Orders_db.Orders WHERE customerId = ?', [customerId]);
  return rows;
};

module.exports = {
  getByCustomerId,
  recreateDatabase,
};
