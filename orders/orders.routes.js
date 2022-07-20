const router = require('express').Router();
const orders = require('./orders');

router.get('/', (_req, res) => res.send('Esse é o serviço de ordens!'));

router.get('/:customerId', orders.getByCustomerId);

module.exports = router;
