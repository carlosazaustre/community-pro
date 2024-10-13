import { OAS3Definition, OAS3Options } from 'openapi-types';
import swaggerJsdoc from 'swagger-jsdoc';

const options: OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Community Pro API',
      version: '1.0.0',
      description: 'API documentation for Community Pro',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  // routes to files containing OpenAPI definitions
  apis: ['./src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options) as OAS3Definition;

export default swaggerSpec;
