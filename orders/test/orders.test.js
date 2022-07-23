const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

chai.use(require('sinon-chai'));

const orders = require('../orders');
const model = require('../orders.model');
const mock = require('./mock');

describe('Testes do Microserviço Orders', () => {
  describe('Testes do método getByCustomerId', () => {
    describe('Retorna a lista de ordens relacionada ao ID do cliente', () => {
      const res = {};
      const req = { params: { customerId: 1 } };

      beforeEach(async () => {
        sinon.stub(model, 'getByCustomerId').resolves(mock.getByCustomerId);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();
      });

      afterEach(() => {
        model.getByCustomerId.restore();
      });

      it('Função retorna com status 200', async () => {
        await orders.getByCustomerId(req, res);
        expect(res.status).to.be.calledWith(200);
      });

      it('Função retorna um array', async () => {
        await orders.getByCustomerId(req, res);
        const [[result]] = await res.send.args;
        expect(result).to.be.an('array');
      });
    });
  });

  describe('Testes do método buy', () => {
  });
});
