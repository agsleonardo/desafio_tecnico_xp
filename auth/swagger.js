require('dotenv').config();

const AUTH_URL_PRD = process.env.AUTH_URL_PRD || '---';
const PORT = process.env.PORT || 3100;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre o cliente e o autoriza.',
    version: '1.0.0',
    title: 'Desafio XP - API Auth',
  },
  servers: [
    {
      url: `${AUTH_URL_PRD}`,
      description: 'Produção',
    },
    {
      url: `http://localhost:${PORT}`,
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
    '/login': {
      post: {
        tags: [
          'auth',
        ],
        summary: 'Autentica o cliente',
        description: '',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/LoginPayload',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/LoginPayload',
              },
              examples: {
                cliente: {
                  value: {
                    email: 'nara@gmail.com',
                    password: '1234',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/LoginOk',
                },
              },
            },
          },
          401: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/MsgErrorCredentials',
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/MsgError',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    MsgError: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
    MsgErrorCredentials: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          enum: ['Usuário ou senha inválidos'],
        },
      },
    },
    LoginPayload: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    LoginOk: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
      },
    },
  },
  externalDocs: {
    description: 'VOLTAR PARA MENU',
    url: 'http://localhost:10000/',
  },
};
