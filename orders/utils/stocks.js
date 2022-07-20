const axios = require('axios');
require('dotenv').config();

const STOCKS_URL = process.env.STOCKS_URL || 'http://localhost:7100';

const getStockInfoById = async (stockId) => {
  const stockBroker = await axios.get(`${STOCKS_URL}/${stockId}`)
    .catch(() => null);
  return stockBroker;
};

const updateStock = async (stockId, stockQty) => {
  const stockBroker = await axios.put(`${STOCKS_URL}/`, { stockId, stockQty })
    .catch(() => null);
  return stockBroker;
};

module.exports = {
  getStockInfoById,
  updateStock,
};
