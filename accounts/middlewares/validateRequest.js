const customError = require('../utils/error');

const validateAccountRequest = (req, _res, next) => {
  const { accountId, amount } = req.body;
  if (!accountId || !amount) throw customError(400, 'Dados incompletos');
  if (+amount <= 0) throw customError(400, 'A quantia para operação deve ser maior que zero');
  next();
};

module.exports = {
  validateAccountRequest,
};
