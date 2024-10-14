import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

interface SwaggerOptions {
  definition: SwaggerDefinition;
  apis: string[];
}

const options: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Community Pro API',
      version: '1.0.0',
      description: 'API documentation for Community Pro',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  // routes to files containing OpenAPI definitions
  apis: ['./src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
