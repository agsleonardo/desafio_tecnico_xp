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
    const importPath = path.resolve(__dirname, 'accounts.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((p) => p.trim());
    const inserts = queries.pop();
    const createTable = queries.pop();
    const queriesPromises = queries.map(async (query) => connection.query(query));
    await Promise.all(queriesPromises)
      .then(() => connection.query(createTable))
      .then(() => connection.query(inserts));
    process.stdout.write('\nDatabase Accounts inciado...\n');
    return '\nDatabase inciado...\n';
  } catch (error) {
    process.stdout.write(`\nFalha em restaurar o Banco Accounts. ${error}\n`);
    return setTimeout(() => recreateDatabase(), 1000);
  }
}

const getByAccountId = async (accountId) => {
  const [[rows]] = await connection.execute(`SELECT * FROM Accounts_db.Accounts WHERE customerId = ${accountId}`);
  return rows;
};

const updateBalance = async (accountId, amount) => connection.execute('UPDATE Accounts_db.Accounts SET balance = ? WHERE customerId = ?', [amount, accountId]);

const create = async (customerId, balance) => connection.execute('INSERT INTO Accounts_db.Accounts (customerId, balance) VALUES (?, ?)', [customerId, balance]);

module.exports = {
  recreateDatabase,
  getByAccountId,
  updateBalance,
  create,
};
