const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('./auth.model');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const isAuthenticated = (req, res) => {
  const { token } = req.body;
  const allowRequest = jwt.verify(token, secret);
  if (!allowRequest) res.status(401).send('Token inválido');
  res.status(200).send(allowRequest);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const customer = await model.getByEmail(email);
  if (!customer) throw new Error('Usuário ou senha inválidos');
  const isAuth = await bcrypt.compare(password, customer.password);
  if (!isAuth) throw new Error('Usuário ou senha inválidos');
  const token = jwt.sign({
    id: customer.id,
    email: customer.email,
    username: customer.username,
  }, secret, { expiresIn: '1h' });
  return res.status(200).send({ token });
};

module.exports = {
  isAuthenticated,
  login,
};
