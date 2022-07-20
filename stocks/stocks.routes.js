const router = require('express').Router();
const stocks = require('./stocks');

router.get('/', stocks.getAll);

router.get('/:stockId', stocks.getByStockId);

router.put('/', stocks.updateStock);

module.exports = router;
