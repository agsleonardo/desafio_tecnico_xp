const jwt = require('jsonwebtoken');
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

module.exports = validateRequest;
