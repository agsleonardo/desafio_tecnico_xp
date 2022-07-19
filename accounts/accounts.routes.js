const router = require('express').Router();

const validates = require('./middlewares/validateRequest');
const accounts = require('./accounts');

router.get('/:accountId', accounts.getByAccountId);

router.put('/withdraw', validates.validateWithdrawRequest, accounts.withdraw);

// router.get('/deposit', accounts.getByAccountId);

module.exports = router;
