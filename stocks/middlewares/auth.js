const axios = require('axios');
require('dotenv').config();

const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3100/';

const allowRequest = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  if (req.originalUrl.includes('swagger')) return next();
  if (!req.headers.authorization) return res.status(401).send({ message: 'Token não encontrado' });
  const token = req.headers.authorization.split(' ')[0] === 'Bearer'
    ? req.headers.authorization.split(' ')[1]
    : req.headers.authorization;
  const { data: isAuthenticated } = await axios.post(`${AUTH_URL}`, { token });
  if (!isAuthenticated) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  return next();
};

module.exports = allowRequest;
