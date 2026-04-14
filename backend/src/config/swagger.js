const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

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
        url: 'https://buildcheck-rose.vercel.app',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3000',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(process.cwd(), 'src/modules/**/*.js'),
    path.join(process.cwd(), 'src/app.js')
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
