require('dotenv').config();

const STOCKS_URL_PRD = process.env.STOCKS_URL_PRD || '---';
const PORT = process.env.PORT || 7100;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre as ações do mercado.',
    version: '1.0.0',
    title: 'Desafio XP - API Stocks',
  },
  servers: [
    {
      url: `${STOCKS_URL_PRD}`,
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
    '/': {
      get: {
        tags: [
          'customers',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Lista todas as ações',
        description: 'Lista todas as ações disponíveis na corretora',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/CustomerById',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Token não encontrado',
                    },
                  },
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
                  $ref: '#/definitions/SignUpPayloadOk',
                },
              },
            },
          },
        },
      },
    },
    '/{stockId}': {
      get: {
        tags: [
          'customers',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Encontra um cliente pelo ID',
        description: 'Retorna as informações do cliente com o ID informado',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'customerId',
            in: 'path',
            description: 'ID do cliente',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/CustomerById',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Token não encontrado',
                    },
                  },
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
                  $ref: '#/definitions/SignUpPayloadOk',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    SignUpPayloadModel: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    SignUpPayloadOExample: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    SignUpPayloadOk: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
    CustomerById: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        stock: {
          type: 'string',
        },
        ticker: {
          type: 'string',
        },
        availableQty: {
          type: 'integer',
        },
        price: {
          type: 'number',
          format: 'double',
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
