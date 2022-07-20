const axios = require('axios');
const model = require('./orders.model');
const { getStockInfoById } = require('./utils/stocks');
require('dotenv').config();

const STOCKS_URL = process.env.STOCKS_URL || 'http://localhost:7100';

const getByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const orders = await model.getByCustomerId(customerId);
  res.status(200).send(orders);
};

const buy = async (req, res) => {
  const { customerId, stockId, stockQty } = req.body;
  const stockBroker = await getStockInfoById(stockId);
  if (!stockBroker) return res.status(404).send({ message: 'Código de ação inválido' });
  if (stockBroker.availableQty < stockQty) return res.status(400).send({ message: 'Quantidade de ações indisponível' });
  await model.buy(customerId, stockId, stockQty, stockBroker.price);
  // ---------------realizar a atualização da carteira do cliente
  return res.status(200).send({ message: 'Ordem de compra executada!' });
};

const sell = async (req, res) => {
  const { customerId, stockId, stockQty } = req.body;
  const { data: stockBroker } = await axios.get(`${STOCKS_URL}/${stockId}`)
    .catch(() => res.status(404).send('Código de ação inválido'));
  if (stockBroker.availableQty < stockQty) return res.status(400).send({ message: 'Quantidade de ações indisponível' });
  await model.sell(customerId, stockId, stockQty, stockBroker.price);
  // ---------------realizar a atualização da carteira do cliente
  return res.status(200).send({ message: 'Ordem de venda executada!' });
};

module.exports = {
  getByCustomerId,
  buy,
  sell,
};
