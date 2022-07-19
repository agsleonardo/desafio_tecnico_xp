const router = require('express').Router();
const accounts = require('./accounts');

router.get('/:accountId', accounts.getByAccountId);

module.exports = router;
