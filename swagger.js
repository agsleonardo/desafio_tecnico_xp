require('dotenv').config();

const swaggerAccounts = require('./accounts/swagger');
const swaggerAuth = require('./auth/swagger');
const swaggerCustomers = require('./customers/swagger');
const swaggerOrders = require('./orders/swagger');
const swaggerStocks = require('./stocks/swagger');
const swaggerWallets = require('./wallets/swagger');

const URL_PROD = process.env.URL_PROD || '---';
const PORT = process.env.PORT || 10000;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Aqui estão reunidos todos endpoints dos microserviços relacionados ao APP de Investimentos desenvolvido para como Desafio Técnico para XP Investimentos.',
    version: '1.0.0',
    title: 'Desafio XP - APP de Investimentos',
  },
  servers: [
    {
      url: `${URL_PROD}`,
      description: 'Produção',
    },
    {
      url: `http://localhost:${PORT}`,
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  basePath: '/v1',
  paths: {
    ...swaggerAccounts.paths,
    ...swaggerAuth.paths,
    ...swaggerCustomers.paths,
    ...swaggerOrders.paths,
    ...swaggerStocks.paths,
    ...swaggerWallets.paths
  },
  definitions: {
    ...swaggerAccounts.definitions,
    ...swaggerAuth.definitions,
    ...swaggerCustomers.definitions,
    ...swaggerOrders.definitions,
    ...swaggerStocks.paths,
    ...swaggerWallets.paths
  },
};
