require('dotenv').config();

const CUSTOMER_URL = process.env.CUSTOMER_URL || 'http://localhost:4000';
const CUSTOMER_URL_PRD = process.env.CUSTOMER_URL_PRD || '---';

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'Esta API fornece informações sobre o cliente e o autentica.',
    version: '1.0.0',
    title: 'Desafio XP - API Cliente',
    contact: {
      email: 'agsleonardo@hotmail.com',
    },
  },
  servers: [
    {
      url: `${CUSTOMER_URL_PRD}`,
      description: 'Produção',
    },
    {
      url: `${CUSTOMER_URL}`,
      description: 'Servidor local',
    },
  ],
  basePath: '/v1',
  paths: {
    '/': {
      post: {
        tags: [
          'cliente',
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
    '/{customerId}': {
      get: {
        tags: [
          'cliente',
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
    '/login': {
      post: {
        tags: [
          'cliente',
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
  },
};