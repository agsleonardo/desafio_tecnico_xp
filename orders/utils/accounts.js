// const axios = require('axios');
const Request = require('./request');
require('dotenv').config();

const ACCOUNTS_URL = process.env.ACCOUNTS_URL || 'http://localhost:5100';

const updateBalance = async (accountId, amount, operation) => {
  await Request.put(`${ACCOUNTS_URL}/${operation}`, { accountId, amount })
    .catch(() => null);
  return true;
};

const checkBalanceToAllowWithdraw = async (customerId, amount) => {
  const { data: accountInfo } = await Request.get(`${ACCOUNTS_URL}/${customerId}`);
  return +accountInfo.balance >= +amount;
};

module.exports = {
  updateBalance,
  checkBalanceToAllowWithdraw,
};
