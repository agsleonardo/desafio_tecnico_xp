module.exports = {
  getByAccountId: {
    response: {
      OK: {
        customerId: 1,
        balance: '200.0000',
      },
      notFound: 'Conta não encontrada',
    },
    payload: {
      OK: { accountId: 1 },
      notFound: { accountId: 2 },
    },
  },
  create: {
    response: {
      message: 'Conta criada com sucesso',
    },
    payload: {
      accountId: 1,
      amount: '200.0000',
    },
  },
  withdraw: {
    response: {
      OK: {
        message: 'Saque realizado com sucesso',
      },
      noBalance: 'Saldo insuficiente',
    },
    payload: {
      OK: {
        accountId: '1',
        amount: '40',
      },
      noBalance: {
        accountId: '1',
        amount: '500',
      },
    },
  },
};
