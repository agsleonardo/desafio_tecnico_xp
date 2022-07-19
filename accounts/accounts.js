const model = require('./accounts.model');
const customError = require('./utils/error');

const getByAccountId = async (req, res) => {
  const { accountId } = req.params;
  const accountData = await model.getByAccountId(accountId);
  if (!accountData) throw customError(404, 'Conta não encontrada');
  res.status(200).send(accountData);
};

module.exports = {
  getByAccountId,
};
