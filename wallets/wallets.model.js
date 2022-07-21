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

const getWalletByCustomerId = async (customerId) => {
  const [wallet] = await connection.query(
    'SELECT * FROM Wallets_db.Wallets WHERE customerId = ?',
    [customerId],
  );
  return wallet.length && wallet;
};

const addNewStockToWallet = async ({
  customerId, stockId, stockQty, value,
}) => {
  const [{ insertId }] = await connection.query('INSERT INTO Wallets_db.Wallets (customerId, stockId, stockQty, averagePrice) VALUES (?, ?, ?, ?)', [customerId, stockId, stockQty, value]);
  return insertId;
};

const updateStockQty = async ({
  customerId, stockId, stockQty, value,
}) => {
  const [{ affectedRows }] = await connection.query('UPDATE Wallets_db.Wallets SET stockQty = ?, averagePrice = ? WHERE customerId = ? AND stockId = ?', [stockQty, value, customerId, stockId]);
  return affectedRows;
};

const deleteStockFromWallet = async ({ customerId, stockId }) => {
  const [{ affectedRows }] = await connection.query('DELETE FROM Wallets_db.Wallets WHERE customerId = ? AND stockId = ?', [customerId, stockId]);
  return affectedRows;
};

module.exports = {
  recreateDatabase,
  getWalletByCustomerId,
  addNewStockToWallet,
  updateStockQty,
  deleteStockFromWallet,
};
