const express = require('express');
const customer = require('./customer');

const routes = express.Router();

routes.post('/', customer.create);

routes.get('/:id', customer.getById);

module.exports = routes;
