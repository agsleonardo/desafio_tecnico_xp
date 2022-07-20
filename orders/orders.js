const model = require('./orders.model');
const { getStockInfoById, updateStock } = require('./utils/stocks');
// const { getCustumerStockInfoById } = require('./utils/wallet');
require('dotenv').config();

const getByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const orders = await model.getByCustomerId(customerId);
  res.status(200).send(orders);
};

const buy = async (req, res) => {
  const { customerId, stockId, stockQty } = req.body;
  // traz informações da acão da corretora
  const { data: stockBroker } = (await getStockInfoById(stockId)) || {};
  if (!stockBroker) return res.status(404).send({ message: 'Código de ação inválido' });
  if (stockBroker.availableQty < stockQty) return res.status(400).send({ message: 'Quantidade de ações indisponível' });

  // faz atualização das ordens de compra na lista de ordens
  await model.buy(customerId, stockId, stockQty, stockBroker.price);

  // faz atualização da corretora
  const newQty = +stockBroker.availableQty - +stockQty;
  await updateStock(stockId, newQty);

  // traz informações da acão e atualiza a carteira do cliente
  // const { data: stockWallet } = (await getCustumerStockInfoById(customerId, stockId)) || {};
  // updateWallet(customerId, stockId, stockQty, newPrice)
  // ---------------realizar a atualização da carteira do cliente
  return res.status(200).send({ message: 'Ordem de compra executada!' });
};

const sell = async (req, res) => {
  const { customerId, stockId, stockQty } = req.body;
  // traz informações da acão da corretora
  const { data: stockBroker } = (await getStockInfoById(stockId)) || {};
  if (!stockBroker) return res.status(404).send({ message: 'Código de ação inválido' });

  // traz informações da acão da carteira
  // const { data: stockWallet } = (await getCustumerStockInfoById(customerId, stockId)) || {};
  // if (stockWallet.stockQty < stockQty) return res
  // .status(400).send({ message: 'Quantidade de ações indisponível em carteira' });

  // faz atualização das ordens de venda na lista de ordens
  await model.sell(customerId, stockId, stockQty, stockBroker.price);

  // faz atualização da corretora
  const newQty = +stockBroker.availableQty + +stockQty;
  await updateStock(stockId, newQty);

  // faz atualização da carteira do cliente
  // updateWallet(customerId, stockId, stockQty)
  return res.status(200).send({ message: 'Ordem de venda executada!' });
};

module.exports = {
  getByCustomerId,
  buy,
  sell,
};
