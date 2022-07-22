const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('./auth.model');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const isAuthenticated = (token) => jwt.verify(token, secret);

const validateRequest = (req, res) => {
  if (!req.headers.authorization) throw new Error('No token provided');
  const token = req.headers.authorization.split(' ')[0] === 'Bearer'
    ? req.headers.authorization.split(' ')[1]
    : req.headers.authorization;
  if (!isAuthenticated(token)) {
    return res.status(401).send();
  }
  return res.status(200).send();
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
  validateRequest,
  login,
};
