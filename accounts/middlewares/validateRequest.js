const customError = require('../utils/error');

const validateAccountRequest = (req, _res, next) => {
  const { accountId, amount } = req.body;
  const validations = [
    {
      check: !accountId || !amount,
      action: () => { throw customError(400, 'Dados incompletos ou quantia zerada.'); },
    },
    {
      check: Number.isNaN(+accountId) || Number.isNaN(+amount),
      action: () => { throw customError(400, 'Dados inválidos, informe apenas números.'); },
    },
    {
      check: +amount <= 0,
      action: () => { throw customError(400, 'A quantia para operação deve ser maior que zero.'); },
    },
  ];
  validations.map(({ check, action }) => check && action());
  next();
};

module.exports = {
  validateAccountRequest,
};
