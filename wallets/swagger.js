require('dotenv').config();

const WALLETS_URL_PRD = process.env.WALLETS_URL_PRD || '---';
const PORT = process.env.PORT || 8100;

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre a carteira dos clientes.',
    version: '1.0.0',
    title: 'Desafio XP - API Wallets',
  },
  servers: [
    {
      url: `${WALLETS_URL_PRD}`,
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
    '/': {
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
  externalDocs: {
    description: 'VOLTAR PARA MENU',
    url: 'http://localhost:10000/',
  },
};
