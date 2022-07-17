const customerModel = require('./customer.model');

const create = async (req, res) => {
  const customer = await customerModel.create(req.body);
  res.json(customer);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const customer = await customerModel.getById(id);
  res.json(customer);
};

module.exports = {
  create,
  getById,
};
