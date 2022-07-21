const router = require('express').Router();
const wallets = require('./wallets');

router.get('/:customerId', wallets.getWalletByCustomerId);

module.exports = router;
