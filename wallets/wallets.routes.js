const router = require('express').Router();
const wallets = require('./wallets');

router.get('/:customerId', wallets.getWalletByCustomerId);

router.post('/', wallets.addNewStockToWallet);

router.put('/', wallets.updateStockQty);

router.delete('/', wallets.deleteStockFromWallet);

module.exports = router;
