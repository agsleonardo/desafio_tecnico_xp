const model = require('./orders.model');

const getByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const orders = await model.getByCustomerId(customerId);
  res.status(200).send(orders);
};

const buy = async (req, res) => {
  const { customerId, stockId, stockQty } = req.body;
  // consultar a corretora para ver se o stockId existe e tem quantidade suficiente
  const order = await model.buy(customerId, stockId, stockQty);
  // realizar a atualização da carteira do cliente
  res.status(200).send(order);
};

module.exports = {
  getByCustomerId,
  buy,
};
