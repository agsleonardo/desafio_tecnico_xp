const express = require('express');
const customer = require('./customer');

const routes = express.Router();

routes.get('/', (req, res) => res.send('Esse é o serviço de clientes'));

routes.post('/login', customer.login);

routes.post('/', customer.create);

routes.get('/:id', customer.getById);

module.exports = routes;
