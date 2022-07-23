const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

const accounts = require('../accounts');
const model = require('../accounts.model');
const mock = require('../mock');

describe('Testes do Microserviço Accounts', () => {
  describe('Testes do método getByAccountId', () => {
    describe('Retorna dados quando informado ID existente', () => {
      const res = {};
      const req = { params: mock.getByAccountId.payload.OK };

      beforeEach(async () => {
        sinon.stub(model, 'getByAccountId').resolves(mock.getByAccountId.response.OK);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
      });

      afterEach(() => {
        model.getByAccountId.restore();
      });

      it('Função retorna com status 200', async () => {
        await accounts.getByAccountId(req, res);
        expect(res.status).to.be.calledWith(200);
      });

      it('Função retorna um objeto com apenas duas chaves customerId e balance', async () => {
        await accounts.getByAccountId(req, res);
        const [[result]] = await res.send.args;
        expect(Object.keys(result)).to.have.lengthOf(2);
        expect(result).to.have.property('customerId');
        expect(result).to.have.property('balance');
      });
    });
    describe('Retorna mensagem quando ID não é encontrado', () => {
      const res = {};
      const req = { params: mock.getByAccountId.payload.notFound };

      beforeEach(async () => {
        sinon.stub(model, 'getByAccountId').resolves(null);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
      });

      afterEach(() => {
        model.getByAccountId.restore();
      });

      it('Função gera erro e retorna com mensagem `Conta não encontrada`', async () => {
        try {
          await accounts.getByAccountId(req, res);
        } catch (error) {
          expect(error.message).to.be.equal('Conta não encontrada');
        }
      });
    });
  });

  describe('Testes do método create', () => {
    const res = {};
    const req = { body: mock.create.payload };

    beforeEach(async () => {
      sinon.stub(model, 'create').resolves(mock.create.response);
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      req.body = sinon.stub().resolves();
    });

    afterEach(() => {
      model.create.restore();
    });

    it('Função retorna com status 200', async () => {
      await accounts.create(req, res);
      expect(res.status).to.be.calledWith(200);
    });

    it('Função retorna mensagem de sucesso', async () => {
      await accounts.create(req, res);
      const [[result]] = await res.send.args;
      expect(result.message).to.be.an('string');
    });
  });

  describe('Testes do método withdraw', () => {
    describe('Com dados corretos, saque é realizado com sucesso', () => {
      const res = {};
      const req = { body: mock.withdraw.payload.OK };

      beforeEach(async () => {
        sinon.stub(model, 'getByAccountId').resolves(mock.getByAccountId.response.OK);
        sinon.stub(model, 'updateBalance').resolves(true);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
      });

      afterEach(() => {
        model.getByAccountId.restore();
        model.updateBalance.restore();
      });

      it('Função retorna com status 200', async () => {
        await accounts.withdraw(req, res);
        expect(res.status).to.be.calledWith(200);
      });

      it('Função retorna mensagem de sucesso', async () => {
        await accounts.withdraw(req, res);
        const [[result]] = await res.send.args;
        expect(result.message).that.includes('Saque realizado com sucesso');
      });
    });

    describe('Retorna mensagem de erro quando cliente não possui saldo em conta', () => {
      const res = {};
      const req = { body: mock.withdraw.payload.noBalance };

      beforeEach(async () => {
        sinon.stub(model, 'getByAccountId').resolves(mock.getByAccountId.response.OK);
        sinon.stub(model, 'updateBalance').resolves(false);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
      });

      afterEach(() => {
        model.getByAccountId.restore();
        model.updateBalance.restore();
      });

      it('Informa quantia superior à disponível em conta', async () => {
        try {
          await accounts.withdraw(req, res);
        } catch (error) {
          expect(error.message).to.be.equal('Saldo insuficiente');
        }
      });
    });
  });

  describe('Testes do método deposit', () => {
    describe('Com dados corretos, depósito é realizado com sucesso', () => {
      const res = {};
      const req = { body: mock.withdraw.payload.OK };

      beforeEach(async () => {
        sinon.stub(model, 'getByAccountId').resolves(mock.getByAccountId.response.OK);
        sinon.stub(model, 'updateBalance').resolves(true);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
      });

      afterEach(() => {
        model.getByAccountId.restore();
        model.updateBalance.restore();
      });

      it('Função retorna com status 200', async () => {
        await accounts.deposit(req, res);
        expect(res.status).to.be.calledWith(200);
      });

      it('Função retorna mensagem de sucesso', async () => {
        await accounts.deposit(req, res);
        const [[result]] = await res.send.args;
        expect(result.message).that.includes('Depósito realizado com sucesso');
      });
    });
  });
});
