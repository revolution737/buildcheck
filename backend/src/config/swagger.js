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
  // Explicitly listing files is much more reliable on Vercel than using glob patterns
  apis: [
    path.join(process.cwd(), 'src/modules/auth/routes.js'),
    path.join(process.cwd(), 'src/modules/components/routes.js'),
    path.join(process.cwd(), 'src/modules/builds/routes.js'),
    path.join(process.cwd(), 'src/modules/compatibility/routes.js'),
    path.join(process.cwd(), 'src/modules/admin/routes.js'),
    path.join(process.cwd(), 'src/app.js')
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
