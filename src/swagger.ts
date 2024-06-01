import swaggerJSDoc from 'swagger-jsdoc'

import config from '@/config'

const serverHost = config.basicConfig.serverHost
const port = config.basicConfig.serverPort
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'API documentation for my application',
    },
    servers: [
      {
        url: `${serverHost}:${port}`,
        description: 'Local Development Server',
      },
    ],
    tags: [
      {
        name: 'Todos',
        description: 'The todo items managing API',
      },
    ],
  },
  apis: ['src/routes/**/index.ts'], // Scan for annotations in route files
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec
