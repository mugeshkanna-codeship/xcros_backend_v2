import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * Swagger configuration for Xcros Real Estate Platform API
 * Production-grade API documentation with RBAC integration
 */

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Xcros API',
    version: '1.0.0',
    description: 'Comprehensive API for real estate platform with RBAC security',
    contact: {
      name: 'Xcros Development Team',
      email: 'dev@xcros.com'
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://api.xcros.com',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique user identifier'
          },
          name: {
            type: 'string',
            description: 'User full name'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address'
          },
          mobile: {
            type: 'string',
            description: 'User mobile number'
          },
          role: {
            type: 'string',
            enum: ['SUPERADMIN', 'COMPANY_ADMIN', 'REAL_ESTATE_AGENT', 'PROPERTY_OWNER', 'CONTENT_MANAGER', 'SUPPORT_STAFF', 'MARKETING_MANAGER', 'FINANCE_MANAGER'],
            description: 'User role in the system'
          },
          status: {
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'PENDING_APPROVAL', 'SUSPENDED'],
            description: 'User account status'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation timestamp'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp'
          }
        },
        required: ['name', 'email', 'mobile', 'role']
      },
      UserProfile: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          userId: {
            type: 'string',
            format: 'uuid'
          },
          bio: {
            type: 'string',
            description: 'User biography'
          },
          avatar: {
            type: 'string',
            description: 'Avatar image URL'
          },
          address: {
            type: 'string',
            description: 'User address'
          },
          city: {
            type: 'string',
            description: 'City name'
          },
          state: {
            type: 'string',
            description: 'State name'
          },
          country: {
            type: 'string',
            description: 'Country name'
          },
          pincode: {
            type: 'string',
            description: 'Postal code'
          }
        }
      },
      LoginRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address'
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'User password'
          }
        },
        required: ['email', 'password']
      },
      RegisterRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Full name'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address'
          },
          mobile: {
            type: 'string',
            description: 'Mobile number'
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'Password (min 6 characters)'
          },
          role: {
            type: 'string',
            enum: ['REAL_ESTATE_AGENT', 'PROPERTY_OWNER'],
            description: 'User role (optional, defaults based on registration type)'
          }
        },
        required: ['name', 'email', 'mobile', 'password']
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Operation success status'
          },
          message: {
            type: 'string',
            description: 'Response message'
          },
          data: {
            type: 'object',
            description: 'Response data payload'
          },
          error: {
            type: 'string',
            description: 'Error message (if any)'
          }
        }
      },
      PaginatedResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean'
          },
          message: {
            type: 'string'
          },
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                description: 'Array of items'
              },
              total: {
                type: 'integer',
                description: 'Total number of items'
              },
              page: {
                type: 'integer',
                description: 'Current page number'
              },
              limit: {
                type: 'integer',
                description: 'Items per page'
              },
              totalPages: {
                type: 'integer',
                description: 'Total number of pages'
              }
            }
          }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js',
    './src/models/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Setup Swagger UI middleware
 * @param {Express.Application} app - Express application instance
 */
export const setupSwagger = (app) => {
  // Swagger UI options
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activate: true,
        theme: 'arta'
      },
      tryItOutEnabled: true,
      requestInterceptor: (req) => {
        // Add any custom request interceptors here
        return req;
      },
      responseInterceptor: (res) => {
        // Add any custom response interceptors here
        return res;
      }
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50 }
      .swagger-ui .scheme-container { background: #f8f9fa }
    `,
    customSiteTitle: 'Xcros Real Estate API Documentation',
    customfavIcon: '/favicon.ico'
  };

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerOptions));

  // Serve raw swagger JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📚 Swagger documentation available at: http://localhost:3000/api-docs');
};

export default swaggerSpec;