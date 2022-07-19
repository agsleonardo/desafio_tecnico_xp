const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const isAuthenticated = (token) => jwt.verify(token, secret);

const validateRequest = (req, res) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('No token provided');
  if (!isAuthenticated(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.status(200).send(true);
};

module.exports = validateRequest;
