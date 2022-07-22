const bcrypt = require('bcrypt');
const Request = require('./utils/request');
const customerModel = require('./customer.model');
require('dotenv').config();

const ACCOUNTS_URL = process.env.ACCOUNTS_URL_PRD || 'http://localhost:5000';

const create = async (req, res) => {
  const { email, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const customer = await customerModel.create(email, username, passwordHash);
  if (!customer) throw new Error('Usuário não cadastrado! Verifique os dados e tente novamente.');
  await Request.post(ACCOUNTS_URL, { accountId: customer, amount: 0.01 });
  res.status(200).send({ message: 'Cliente criado com sucesso' });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const customer = await customerModel.getById(id);
  res.status(200).send(customer);
};

module.exports = {
  create,
  getById,
};
