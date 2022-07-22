// const axios = require('axios');
const Request = require('./request');
require('dotenv').config();

const WALLETS_URL = process.env.WALLETS_URL || 'http://localhost:8100';

const getCustomerWallet = async (customerId) => {
  const customerWallet = await Request.get(`${WALLETS_URL}/${customerId}`)
    .catch(() => null);
  return customerWallet;
};

const insertStockIntoWallet = async (customerId, stockId, stockQty, value) => {
  const stockWallet = await Request.post(`${WALLETS_URL}/`, {
    customerId, stockId, stockQty, value,
  })
    .catch(() => null);
  return stockWallet;
};

const updateStockAtWallet = async (customerId, stockId, stockQty, value) => {
  const customerWallet = await Request.put(`${WALLETS_URL}/`, {
    customerId, stockId, stockQty, value,
  })
    .catch(() => null);
  return customerWallet;
};

const deleteStockFromWallet = async (customerId, stockId) => {
  const customerWallet = await Request.delete(`${WALLETS_URL}/?customerId=${customerId}&stockId=${stockId}`, {
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
