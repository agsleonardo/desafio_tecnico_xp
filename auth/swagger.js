require('dotenv').config();

const AUTH_URL_PRD = process.env.AUTH_URL_PRD || '---';

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre o cliente e o autoriza.',
    version: '1.0.0',
    title: 'Desafio XP - API auth',
    contact: {
      email: 'agsleonardo@hotmail.com',
    },
  },
  servers: [
    {
      url: `${AUTH_URL_PRD}`,
      description: 'Produção',
    },
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  basePath: '/v1',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/': {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: [
          'auth',
        ],
        summary: 'Valida a requisição ao endpoint.',
        description: '',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
};
