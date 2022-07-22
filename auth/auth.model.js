const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
});

const getByEmail = async (email) => {
  const [[rows]] = await connection.query('SELECT * FROM Customers_db.Customers WHERE email = ?', [email]);
  return rows;
};

module.exports = {
  getByEmail,
};
