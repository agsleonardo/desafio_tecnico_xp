const model = require('./wallets.model');

const getWalletByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const wallet = await model.getWalletByCustomerId(customerId);
  if (!wallet) return res.status(404).send({ message: 'Carteira não encontrada' });
  return res.status(200).send(wallet);
};

module.exports = {
  getWalletByCustomerId,
};
