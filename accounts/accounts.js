const model = require('./accounts.model');
const customError = require('./utils/error');

const getByAccountId = async (req, res) => {
  const { accountId } = req.params;
  const accountData = await model.getByAccountId(accountId);
  res.status(200).send(accountData);
};

const withdraw = async (req, res) => {
  const { accountId, amount } = req.body;
  const accountData = await model.getByAccountId(accountId);
  if (+accountData.balance < +amount) throw customError(400, 'Saldo insuficiente');
  const newBalance = accountData.balance - amount;
  await model.updateBalance(accountId, newBalance);
  res.status(200).send({ message: `Saque realizado com sucesso! Novo saldo: R$ ${newBalance.toFixed(2)}` });
};

const deposit = async (req, res) => {
  const { accountId, amount } = req.body;
  const accountData = await model.getByAccountId(accountId);
  const newBalance = +accountData.balance + +amount;
  await model.updateBalance(accountId, newBalance);
  res.status(200).send({ message: `Depósito realizado com sucesso! Novo saldo: R$ ${newBalance.toFixed(2)}` });
};

module.exports = {
  getByAccountId,
  withdraw,
  deposit,
};
