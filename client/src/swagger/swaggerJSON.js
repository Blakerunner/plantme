const swaggerJSON = {
  swagger: '2.0',
  info: {
    description:
      'This is the API documentation for the Plantme, an API server dedicated to providing data about plants.',
    version: '1.0.0',
    title: 'Plantme API',
  },
  host: 'plantme.blakerunner.com',
  basePath: '/api/v1',
  tags: [
    {
      name: "plant",
      description: "Operations related to plants",
    },
    {
      name: "user",
      description: "Operations related to the user",
    },
    {
      name: "auth",
      description: "Operations related to authentication",
    },
    {
      name: "admin",
      description: "Operations related to admin data",
    }
  ],
  schemes: ['https'],
  paths: {
    "/user/me": {
      get: {
        tags: ["user"],
        summary: "Gets the current user",
        description: "Fetches the current user's information from the database.",
        operationId: "getUser",
        produces: ["application/json"],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: "#/definitions/User"
            },
          },
          400: {
            description: 'Invalid status value',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/user": {
      post: {
        tags: ["user"],
        summary: "Adds a plant to the user's favourites",
        description: "Adds a plant to the user's favourites in the database.",
        operationId: "addPlantToFavourites",
        produces: ["application/json"],
        parameters: [
          {
            name: "plantId",
            in: "path",
            description: "ID of plant that will be added to user's favourites",
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/User"
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
      delete: {
        tags: ["user"],
        summary: "Deletes a plant from the user's favourites",
        description: "Deletes a plant from the user's favourites in the database.",
        operationId: "deletePlantFromFavourites",
        produces: ["application/json"],
        parameters: [
          {
            name: "plantId",
            in: "path",
            description: "ID of plant that will be removed from user's favourites",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/User"
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/plant": {
      get: {
        tags: ["plant"],
        summary: "Gets all plants",
        description: "Fetches all plants from the database.",
        operationId: "getPlants",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Plant",
              },
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
      post: {
        tags: ['plant'],
        summary: 'Create a plant in the database with form data',
        description: 'Creates a plant.',
        operationId: 'updatePlantWithForm',
        consumes: ['application/x-www-form-urlencoded'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'plantId',
            in: 'path',
            description: 'ID of plant that needs to be created',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'name',
            in: 'formData',
            description: 'Created name of the plant',
            required: false,
            type: 'string',
          },
          {
            name: 'status',
            in: 'formData',
            description: 'Created status of the plant',
            required: false,
            type: 'string',
          },
        ],
        responses: {
          405: {
            description: 'Invalid input',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
      put: {
        tags: ["plant"],
        summary: "Updates a plant",
        description: "Updates a plant's field in the database.",
        operationId: "updatePlant",
        produces: ["application/xml", "application/json"],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: false,
            type: 'string',
          },
          {
            name: 'plantId',
            in: 'path',
            description: 'Plant ID to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
      delete: {
        tags: ["plant"],
        summary: "Deletes a plant",
        description: "Deletes a specified plant from the database.",
        operationId: "deletePlant",
        produces: ["application/json"],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: false,
            type: 'string',
          },
          {
            name: 'plantId',
            in: 'path',
            description: 'Plant ID to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    '/plant/{plantId}': {
      get: {
        tags: ['plant'],
        summary: 'Find plant by ID',
        description: 'Returns a single plant.',
        operationId: 'getPlantById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'plantId',
            in: 'path',
            description: 'ID of plant to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Plant',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    '/auth/register': {
      post: {
        tags: ['auth'],
        summary: 'Register a user',
        description: 'Registers and saves a user into the database',
        operationId: 'registerUser',
        produces: ['application/json'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'user data',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Plant',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    '/auth/login': {
      post: {
        tags: ['auth'],
        summary: 'Login a user',
        description: 'Logs a user in to the application.',
        operationId: 'loginUser',
        produces: ['application/json'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'user data',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Plant',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    '/auth/stats': {
      get: {
        tags: ['auth'],
        summary: 'Gets authentication stats',
        description: 'Returns a stats about authentication.',
        operationId: 'getAuthStats',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Plant',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    '/admin/endpointStats': {
      get: {
        tags: ['admin'],
        summary: 'Gets stats about all endpoints',
        description: 'Fetches the number of requests for all endpoints.',
        operationId: 'getEndpointStats',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Plant',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    '/admin/seedDatabase': {
      get: {
        tags: ['admin'],
        summary: 'Loads the database with sample data',
        description: 'Saves sample data to the database.',
        operationId: 'seedDatabase',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Plant',
            },
          },
          400: {
            description: 'Invalid ID supplied',
          },
          404: {
            description: 'Plant not found',
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      }
    },
    "/plant/{plantId}": {
      get: {
        tags: ["plant"],
        summary: "Find plant by ID",
        description: "Returns a single plant.",
        operationId: "getPlantById",
        produces: ["application/json"],
        parameters: [
          {
            name: "plantId",
            in: "path",
            description: "ID of plant to return",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Plant",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Plant not found",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/auth/register": {
      post: {
        tags: ["auth"],
        summary: "Register a user",
        description: "Registers and saves a user into the database",
        operationId: "registerUser",
        produces: ["application/json"],
        parameters: [
          {
            name: "user",
            in: "body",
            description: "user data",
            required: true,
            schema: {
              $ref: "#/definitions/User"
            }
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Plant",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Plant not found",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/auth/login": {
      post: {
        tags: ["auth"],
        summary: "Login a user",
        description: "Logs a user in to the application.",
        operationId: "loginUser",
        produces: ["application/json"],
        parameters: [
          {
            name: "user",
            in: "body",
            description: "user data",
            required: true,
            schema: {
              $ref: "#/definitions/User"
            }
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Plant",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Plant not found",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/auth/stats": {
      get: {
        tags: ["auth"],
        summary: "Gets authentication stats",
        description: "Returns a stats about authentication.",
        operationId: "getAuthStats",
        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Plant",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Plant not found",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/admin/endpointStats": {
      get: {
        tags: ["admin"],
        summary: "Gets stats about all endpoints",
        description: "Fetches the number of requests for all endpoints.",
        operationId: "getEndpointStats",
        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Plant",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Plant not found",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    },
    "/admin/seedDatabase": {
      get: {
        tags: ["admin"],
        summary: "Loads the database with sample data",
        description: "Saves sample data to the database.",
        operationId: "seedDatabase",
        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Plant",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Plant not found",
          },
        },
        security: [
          {
            api_key: [],
          },
        ],
      },
    }
  },
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
  definitions: {
    User: {
      type: "object",
      required: ["name", "id"],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: "string",
          example: "Elon Musk",
        },
      },
      xml: {
        name: "User",
      },
    },
    Plant: {
      type: "object",
      required: ["name", "id"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
          example: "Brandywine Tomato",
        }
      },
      xml: {
        name: "Plant",
      },
    },
    ApiResponse: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  },
};

module.exports = {
  swaggerJSON,
};
