const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerModel = require('./customer.model');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const create = async (req, res) => {
  const { email, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const customer = await customerModel.create(email, username, passwordHash);
  res.json(customer);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const customer = await customerModel.getById(id);
  res.json(customer);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const customer = await customerModel.getByEmail(email);
  if (!customer) throw new Error('Usuário ou senha inválidos');
  const isAuth = await bcrypt.compare(password, customer.password);
  console.log(customer);
  if (!isAuth) throw new Error('Usuário ou senha inválidos');
  const token = jwt.sign({
    id: customer.id,
    email: customer.email,
    username: customer.username,
  }, secret, { expiresIn: '1h' });
  return res.json({ token });
};

module.exports = {
  create,
  getById,
  login,
};
