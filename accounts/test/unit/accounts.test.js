const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

const accounts = require('../../accounts');
const model = require('../../accounts.model');
const mock = require('../../mock');

describe('Testes do Microserviço Accounts', () => {
  describe('Testes do método getByAccountId', () => {
    const res = {};
    const req = {};

    beforeEach(async () => {
      sinon.stub(model, 'getByAccountId').resolves(mock.getByAccountId);
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      req.params = sinon.stub().resolves({ accountId: 1 });
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
});
