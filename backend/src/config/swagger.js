const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BuildCheck API',
      version: '1.0.0',
      description: 'PC Component Compatibility Checker API',
    },
    servers: [
      {
        url: 'https://buildcheck-rose.vercel.app/api/v1',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local development',
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
    paths: {
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'User Login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/auth/register': {
        post: {
          tags: ['Authentication'],
          summary: 'User Registration',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User created' }
          }
        }
      },
      '/components': {
        get: {
          tags: ['Components'],
          summary: 'Get all PC components',
          responses: {
            200: { description: 'List of components' }
          }
        }
      },
      '/compatibility/check': {
        post: {
          tags: ['Compatibility'],
          summary: 'Check build compatibility',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cpuId: { type: 'string' },
                    motherboardId: { type: 'string' },
                    ramId: { type: 'string' },
                    gpuId: { type: 'string' },
                    psuId: { type: 'string' },
                    caseId: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Compatibility report' }
          }
        }
      }
    }
  },
  apis: [], // No scanning needed since we defined paths above!
};

module.exports = swaggerJsdoc(options);
