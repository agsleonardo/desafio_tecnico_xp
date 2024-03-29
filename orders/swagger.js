require('dotenv').config();

const ORDERS_URL_PRD = process.env.CUSTOMER_URL_PRD || '---';
const PORT = process.env.PORT || 6100;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre as ordens de um cliente e o também cria ordens de compra e venda de ações.',
    version: '1.0.0',
    title: 'Desafio XP - API Orders',
  },
  servers: [
    {
      url: `${ORDERS_URL_PRD}`,
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
    '/{customerId}': {
      get: {
        tags: [
          'customers',
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
    '/buy': {
      post: {
        tags: [
          'customers',
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
    '/sell': {
      post: {
        tags: [
          'customers',
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
  },
  definitions: {
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
  },
  externalDocs: {
    description: 'VOLTAR PARA MENU',
    url: 'http://localhost:10000/',
  },
};
