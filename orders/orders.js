const model = require('./orders.model');

const getByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  const orders = await model.getByCustomerId(customerId);
  res.status(200).send(orders);
};

module.exports = {
  getByCustomerId,
};
