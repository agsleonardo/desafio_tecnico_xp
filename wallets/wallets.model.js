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
    const importPath = path.resolve(__dirname, 'wallets.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((p) => p.trim());
    const createTable = queries.pop();
    const queriesPromises = queries.map(async (query) => connection.query(query));
    await Promise.all(queriesPromises)
      .then(() => connection.query(createTable));
    process.stdout.write('\nDatabase Wallets inciado...\n');
    return '\nDatabase inciado...\n';
  } catch (error) {
    process.stdout.write(`\nFalha em restaurar o Banco Wallets. ${error}\n`);
    return setTimeout(() => recreateDatabase(), 1000);
  }
}

module.exports = {
  recreateDatabase,
};
