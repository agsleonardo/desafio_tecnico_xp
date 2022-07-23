require('dotenv').config();

const URL_PROD = process.env.URL_PROD || '---';
const PORT = process.env.PORT || 10000;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Aqui você encontra o catálogo de todos os endpoints relacionados ao sistema desenvolvido para o Desafio XP.',
    version: '1.0.0',
    title: 'Desafio XP',
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
    '/accounts/{customerId}': {
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
    '/accounts': {
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
    '/accounts/withdraw': {
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
    '/accounts/deposit': {
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
    '/auth': {
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
    '/auth/login': {
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
    '/customers': {
      post: {
        tags: [
          'customers',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Cadastra um novo cliente',
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
              $ref: '#/definitions/SignUpPayloadModel',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/SignUpPayloadOExample',
              },
              examples: {
                cliente: {
                  value: {
                    username: 'Leonardo',
                    email: 'agsleonardo@hotmail.com',
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
                  $ref: '#/definitions/SignUpPayloadOk',
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
    '/customers/{customerId}': {
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
    '/orders/{customerId}': {
      get: {
        tags: [
          'orders',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Encontra as ordens de um cliente pelo ID',
        description: 'Retorna as informações de todas ordens de determinado cliente com o ID informado',
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
                  type: 'array',
                  items: {
                    $ref: '#/definitions/OrdersById',
                  },
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
    '/orders/buy': {
      post: {
        tags: [
          'orders',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Cadastra uma nova ordem de compra',
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
              $ref: '#/definitions/BuyPayloadModel',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/BuyPayloadModel',
              },
              examples: {
                cliente: {
                  value: {
                    customerId: 1,
                    stockId: 25,
                    stockQty: 5,
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
                  $ref: '#/definitions/SignUpPayloadOk',
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
    '/orders/sell': {
      post: {
        tags: [
          'orders',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Cadastra uma nova ordem de venda',
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
              $ref: '#/definitions/BuyPayloadModel',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/BuyPayloadModel',
              },
              examples: {
                200: {
                  value: {
                    customerId: 1,
                    stockId: 25,
                    stockQty: 5,
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
                  value: {
                    customerId: 1,
                    stockId: 75,
                    stockQty: 5,
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
                  $ref: '#/definitions/SignUpPayloadOk',
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
                  $ref: '#/definitions/CustomerDontHaveStock',
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
    '/stocks': {
      get: {
        tags: [
          'stocks',
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
    '/stocks/{stockId}': {
      get: {
        tags: [
          'stocks',
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
    '/wallets/{customerId}': {
      get: {
        tags: [
          'wallets',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Encontra as ações da carteira de um cliente pelo ID',
        description: 'Retorna as informações de todas ações de determinado cliente com o ID informado',
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
                  type: 'array',
                  items: {
                    $ref: '#/definitions/WalletById',
                  },
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
                  $ref: '#/definitions/DefaultMessageNotFound',
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
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
        },
      },
    },
    '/wallets': {
      post: {
        tags: [
          'wallets',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Cadastra uma nova ação na carteira de um cliente',
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
              $ref: '#/definitions/WalletPayloadModel',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/WalletPayloadModel',
              },
              examples: {
                cliente: {
                  value: {
                    customerId: 1,
                    stockId: 35,
                    stockQty: 5,
                    value: 100,
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
                  $ref: '#/definitions/WalletPostSuccess',
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
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
        },
      },
      put: {
        tags: [
          'wallets',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Atualiza o registro de uma ação na carteira de um cliente',
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
              $ref: '#/definitions/WalletPayloadModel',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/WalletPayloadModel',
              },
              examples: {
                cliente: {
                  value: {
                    customerId: 1,
                    stockId: 85,
                    stockQty: 5,
                    value: 100,
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
                  $ref: '#/definitions/WalletPutSuccess',
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
                  $ref: '#/definitions/DefaultMessageNotFoundPut',
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
                  $ref: '#/definitions/DefaultMessageError',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: [
          'wallets',
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Remove uma ação existente na carteira de um cliente',
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
              $ref: '#/definitions/WalletPayloadModelDel',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/WalletPayloadModel',
              },
              examples: {
                cliente: {
                  value: {
                    customerId: 1,
                    stockId: 85,
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
                  $ref: '#/definitions/WalletDeleteSuccess',
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
                  $ref: '#/definitions/DefaultMessageNotFoundDelete',
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
                  $ref: '#/definitions/DefaultMessageError',
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
        email: {
          type: 'string',
        },
        username: {
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
    BuyPayloadModel: {
      type: 'object',
      properties: {
        customerId: {
          type: 'integer',
        },
        stockId: {
          type: 'integer',
        },
        stockQty: {
          type: 'integer',
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
    CustomerDontHaveStock: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cliente não existe ou possui a ação informada!',
        },
      },
    },
    OrdersById: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        customerId: {
          type: 'integer',
        },
        stockId: {
          type: 'integer',
        },
        stockQty: {
          type: 'integer',
        },
        stockPrice: {
          type: 'number',
          format: 'double',
        },
        transactionType: {
          type: 'string',
        },
        createdAt: {
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
    WalletById: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        customerId: {
          type: 'integer',
        },
        stockId: {
          type: 'integer',
        },
        stockQty: {
          type: 'integer',
        },
        averagePrice: {
          type: 'number',
          format: 'double',
        },
      },
    },
    DefaultMessageNotFound: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Carteira vazia ou inexistente!',
        },
      },
    },
    DefaultMessageNotFoundPut: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cliente não possui esta ação em carteira',
        },
      },
    },
    DefaultMessageNotFoundDelete: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cliente não possui esta ação em carteira',
        },
      },
    },
    DefaultMessageError: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
    WalletPayloadModel: {
      type: 'object',
      properties: {
        customerId: {
          type: 'integer',
        },
        stockId: {
          type: 'integer',
        },
        stockQty: {
          type: 'integer',
        },
        value: {
          type: 'number',
          format: 'double',
        },
      },
    },
    WalletPayloadModelDel: {
      type: 'object',
      properties: {
        customerId: {
          type: 'integer',
        },
        stockId: {
          type: 'integer',
        },
      },
    },
    WalletPostSuccess: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'Ação adicionada com sucesso!',
        },
      },
    },
    WalletPutSuccess: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'Ação atualizada com sucesso!',
        },
      },
    },
    WalletDeleteSuccess: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'Ação removida com sucesso!',
        },
      },
    },
  },
};
