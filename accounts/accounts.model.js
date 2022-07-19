const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');
const customError = require('./utils/error');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
});

const recreateDatabase = async () => {
  try {
    const importPath = path.resolve(__dirname, 'accounts.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((p) => p.trim());
    const inserts = queries.pop();
    const queriesPromises = queries.map(async (query) => connection.execute(query));
    await Promise.all(queriesPromises);
    await connection.execute(inserts);
    process.stdout.write('\nDatabase inciado...\n');
  } catch (error) {
    process.stdout.write(`Falha em restaurar o Banco. ${error}`);
  }
};

const getByAccountId = async (accountId) => {
  const [[rows]] = await connection.execute(`SELECT * FROM Accounts_db.Accounts WHERE customerId = ${accountId}`);
  if (!rows) throw customError(404, 'Conta não encontrada');
  return rows;
};

const updateBalance = async (accountId, amount) => {
  const rows = await connection.execute('UPDATE Accounts_db.Accounts SET balance = ? WHERE customerId = ?', [amount, accountId]);
  return rows;
};
module.exports = {
  recreateDatabase,
  getByAccountId,
  updateBalance,
};
