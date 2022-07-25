const model = require('./stocks.model');

const getByStockId = async (req, res) => {
  const { stockId } = req.params;
  const stock = await model.getByStockId(stockId);
  if (!stock) {
    return res.status(404).send({ message: 'Ação não encontrada' });
  }
  return res.status(200).send(stock);
};

const getAll = async (_req, res) => {
  const stocks = await model.getAll();
  if (!stocks) {
    return res.status(404).send({ message: 'Nenhuma ação encontrada' });
  }
  return res.status(200).send(stocks);
};

const updateStock = async (req, res) => {
  const { stockId, stockQty } = req.body;
  await model.updateStock(stockId, stockQty);
  return res.status(200).send({ message: 'Ação atualizada' });
};

module.exports = {
  getByStockId,
  getAll,
  updateStock,
};
