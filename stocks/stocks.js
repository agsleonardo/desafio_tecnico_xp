const model = require('./stocks.model');

const getByStockId = async (req, res) => {
  const { stockId } = req.params;
  const stock = await model.getByStockId(stockId);
  if (!stock) {
    return res.status(404).send({ message: 'Stock not found' });
  }
  return res.status(200).send(stock);
};

const getAll = async (req, res) => {
  const stocks = await model.getAll();
  if (!stocks) {
    return res.status(404).send({ message: 'No Stocks' });
  }
  return res.status(200).send(stocks);
};

module.exports = {
  getByStockId,
  getAll,
};
