require('dotenv').config();

const CUSTOMER_URL = process.env.CUSTOMER_URL || 'http://localhost:5000';
const CUSTOMER_URL_PROD = process.env.CUSTOMER_URL_PROD || 'http://localhost:5000';

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre a conta dos clientes.',
    version: '1.0.0',
    title: 'Desafio XP - API Contas',
    contact: {
      email: 'agsleonardo@hotmail.com',
    },
  },
  servers: [
    {
      url: `${CUSTOMER_URL_PROD}`,
      description: 'Produção',
    },
    {
      url: `${CUSTOMER_URL}`,
      description: 'Servidor local',
    },
  ],
  basePath: '/v1',
  schemes: [
    'https',
    'http',
  ],
  paths: {
    '/{customerId}': {
      get: {
        tags: [
          'contas',
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
    '/withdraw': {
      put: {
        tags: [
          'contas',
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
          'contas',
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
};
