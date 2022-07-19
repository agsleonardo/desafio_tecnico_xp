const router = require('express').Router();
const { validateAccountRequest } = require('./middlewares/validateRequest');
const accounts = require('./accounts');

router.get('/', (req, res) => res.send('Este é o serviço de contas'));

router.get('/:accountId', accounts.getByAccountId);

router.put('/withdraw', validateAccountRequest, accounts.withdraw);

router.put('/deposit', validateAccountRequest, accounts.deposit);

module.exports = router;
