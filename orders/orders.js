const model = require('./orders.model');
const { getStockInfoById, updateStock } = require('./utils/stocks');
const {
  getCustomerWallet, insertStockIntoWallet, updateStockAtWallet, deleteStockFromWallet,
} = require('./utils/wallet');
require('dotenv').config();

const getByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const orders = await model.getByCustomerId(customerId);
  res.status(200).send(orders);
};

const calculateAveragePrice = (oldQty, oldPrice, newQty, newPrice) => {
  const oldTotal = oldQty * oldPrice;
  const newTotal = newQty * newPrice;
  const averagePrice = (oldTotal + newTotal) / (oldQty + newQty);
  return averagePrice;
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
  const newBrokerQty = +stockBroker.availableQty - +stockQty;
  await updateStock(stockId, newBrokerQty);

  // traz informações da acão e atualiza a carteira do cliente
  const { data: stocksWallet } = (await getCustomerWallet(customerId, stockId)) || {};
  const stockInWallet = stocksWallet && stocksWallet.find((stock) => stock.stockId === stockId);
  if (stockInWallet) {
    const newStockQty = +stockInWallet.stockQty + +stockQty;
    const newValue = calculateAveragePrice(
      +stockInWallet.stockQty,
      +stockInWallet.averagePrice,
      +stockQty,
      +stockBroker.price,
    );
    await updateStockAtWallet(customerId, stockId, newStockQty, newValue);
    return res.status(200).send({ message: 'Ordem de compra executada!' });
  }
  // ---------------realizar a atualização da carteira do cliente
  insertStockIntoWallet(customerId, stockId, stockQty, stockBroker.price);
  return res.status(200).send({ message: 'Ordem de compra executada!' });
};

const sell = async (req, res) => {
  const { customerId, stockId, stockQty } = req.body;
  // traz informações da acão da corretora
  const { data: stockBroker } = (await getStockInfoById(stockId)) || {};
  if (!stockBroker) return res.status(404).send({ message: 'Código de ação inválido' });

  // traz informações da acão da carteira
  const { data: stocksWallet } = (await getCustomerWallet(customerId, stockId)) || {};
  // verifica se cliente possui ação
  const stockInWallet = stocksWallet && stocksWallet.find((stock) => stock.stockId === stockId);
  if (!stockInWallet) return res.status(404).send({ message: 'Cliente não possui a ação informada!' });
  // verifica se a quantidade de ações na carteira é maior que a quantidade a ser vendida
  if (stockInWallet.stockQty < stockQty) return res.status(400).send({ message: 'Quantidade de ações indisponível para venda' });

  // faz o calculo para carteira do cliente
  const newStockQty = +stockInWallet.stockQty - +stockQty;
  const newValue = calculateAveragePrice(
    +stockInWallet.stockQty,
    +stockInWallet.averagePrice,
    +stockQty,
    +stockBroker.price,
  );

  // faz atualização das ordens de venda na lista de ordens
  await model.sell(customerId, stockId, stockQty, stockBroker.price);

  // faz atualização da corretora
  const newBrokerQty = +stockBroker.availableQty + +stockQty;
  await updateStock(stockId, newBrokerQty);
  // faz atualização da carteira do cliente
  if (newStockQty === 0) {
    await deleteStockFromWallet(customerId, stockId);
    return res.status(200).send({ message: 'Ordem de venda executada!' });
  }
  await updateStockAtWallet(customerId, stockId, newStockQty, newValue);
  return res.status(200).send({ message: 'Ordem de venda executada!' });
};

module.exports = {
  getByCustomerId,
  buy,
  sell,
};
