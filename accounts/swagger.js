require('dotenv').config();

const ACCOUNTS_URL_PROD = process.env.ACCOUNTS_URL_PROD || '---';
const PORT = process.env.PORT || 5100;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre a conta dos clientes.',
    version: '1.0.0',
    title: 'Desafio XP - API Accounts',
  },
  servers: [
    {
      url: `${ACCOUNTS_URL_PROD}`,
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
    '/{customerId}': {
      get: {
        tags: [
          'accounts',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Encontra a conta de um cliente pelo ID',
        description: 'Retorna as informações da conta do cliente com o ID informado',
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
          404: {
            description: 'Not Found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/CustomerByIdNotFound',
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
                  $ref: '#/definitions/AccountPayloadOk',
                },
              },
            },
          },
        },
      },
    },
    '/': {
      post: {
        tags: [
          'accounts',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Cadastra uma nova conta',
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
              $ref: '#/definitions/AccountPayload',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/AccountPayload',
              },
              examples: {
                cliente: {
                  value: {
                    accountId: 2,
                    amount: 10,
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
                  $ref: '#/definitions/AccountPayloadOk',
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
                  $ref: '#/definitions/CustomerByIdNotFound',
                },
              },
            },
          },
        },
      },
    },
    '/withdraw': {
      put: {
        tags: [
          'accounts',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Realiza um saque na conta de um cliente',
        description: '',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/AccountPayloadExample',
              },
              examples: {
                cliente: {
                  value: {
                    accountId: '1',
                    amount: '40',
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
                  $ref: '#/definitions/AccountPayloadOk',
                },
              },
            },
          },
          404: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/AccountPayloadOk',
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
                  $ref: '#/definitions/AccountPayloadOk',
                },
              },
            },
          },
        },
      },
    },
    '/deposit': {
      put: {
        tags: [
          'accounts',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Realiza um depósito na conta de um cliente',
        description: '',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/AccountPayloadExample',
              },
              examples: {
                cliente: {
                  value: {
                    accountId: '1',
                    amount: '40',
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
                  $ref: '#/definitions/AccountPayloadOk',
                },
              },
            },
          },
          404: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/definitions/AccountPayloadOk',
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
                  $ref: '#/definitions/AccountPayloadOk',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    AccountPayload: {
      type: 'object',
      properties: {
        accountId: {
          type: 'integer',
        },
        amount: {
          type: 'integer',
        },
      },
    },
    AccountPayloadExample: {
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
    AccountPayloadOk: {
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
        customerId: {
          type: 'integer',
        },
        balance: {
          type: 'integer',
        },
      },
    },
    CustomerByIdNotFound: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
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
