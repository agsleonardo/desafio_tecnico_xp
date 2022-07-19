const customError = require('../utils/error');

const validateWithdrawRequest = (req, _res, next) => {
  const { accountId, amount } = req.body;
  if (!accountId || !amount) throw customError(400, 'Dados incompletos');
  if (+amount <= 0) throw customError(400, 'A quantia para saque deve ser maior que zero');
  next();
};

module.exports = {
  validateWithdrawRequest,
};
