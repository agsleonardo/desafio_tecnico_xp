const model = require('./wallets.model');

const getWalletByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const wallet = await model.getWalletByCustomerId(customerId);
  if (!wallet) return res.status(404).send({ message: 'Carteira vazia ou inexistente!' });
  return res.status(200).send(wallet);
};

const addNewStockToWallet = async (req, res) => {
  const newStock = await model.addNewStockToWallet(req.body);
  if (!newStock) return res.status(404).send({ message: 'Falha na inclusão da ação em carteira' });
  return res.status(200).send({ message: 'Ação adicionada com sucesso!' });
};

const updateStockQty = async (req, res) => {
  const updatedStock = await model.updateStockQty(req.body);
  if (!updatedStock) return res.status(404).send({ message: 'Cliente não possui esta ação em carteira' });
  return res.status(200).send({ message: 'Ação atualizada com sucesso!' });
};

const deleteStockFromWallet = async (req, res) => {
  console.log('AQUI AS QUET', req.query);
  const deletedStock = await model.deleteStockFromWallet(req.query);
  if (!deletedStock) return res.status(404).send({ message: 'Cliente não possui esta ação em carteira' });
  return res.status(200).send({ message: 'Ação removida com sucesso!' });
};

module.exports = {
  getWalletByCustomerId,
  addNewStockToWallet,
  updateStockQty,
  deleteStockFromWallet,
};
