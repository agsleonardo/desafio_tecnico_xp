const axios = require('axios');
require('dotenv').config();

const WALLETS_URL = process.env.WALLETS_URL || 'http://localhost:8100';

const getCustomerWallet = async (customerId) => {
  const customerWallet = await axios.get(`${WALLETS_URL}/${customerId}`)
    .catch(() => null);
  return customerWallet;
};

const insertStockIntoWallet = async (customerId, stockId, stockQty, value) => {
  const stockWallet = await axios.post(`${WALLETS_URL}/`, {
    customerId, stockId, stockQty, value,
  })
    .catch(() => null);
  return stockWallet;
};

const updateStockAtWallet = async (customerId, stockId, stockQty, value) => {
  const customerWallet = await axios.put(`${WALLETS_URL}/`, {
    customerId, stockId, stockQty, value,
  })
    .catch(() => null);
  return customerWallet;
};

const deleteStockFromWallet = async (customerId, stockId) => {
  const customerWallet = await axios.delete(`${WALLETS_URL}/`, {
    customerId, stockId,
  })
    .catch(() => null);
  return customerWallet;
};

module.exports = {
  getCustomerWallet,
  insertStockIntoWallet,
  updateStockAtWallet,
  deleteStockFromWallet,
};
