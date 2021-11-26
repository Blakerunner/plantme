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
        description: "Fetches the current user's information from the database. Requires a User API token to produce a successful operation.",
        operationId: "getUser",
        produces: ["application/json"],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            description: 'User API token',
            required: true
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: true,
                message: "Successful operation.",
                data: {
                  user: {
                    id: 1,
                    email: "elon@tesla.com",
                    password: null,
                    isAdmin: true,
                    plantList: { ids: [1, 2, 3] }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request',
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
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
      put: {
        tags: ["user"],
        summary: "Adds a plant to the user's favourites",
        description: "Adds a plant to the user's favourites in the database. Requires a User API token to produce a successful operation.",
        operationId: "addPlantToFavourites",
        produces: ["application/json"],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            description: 'User API token',
            required: true
          },
          {
            name: 'plant',
            in: 'body',
            description: 'Plant containing ID',
            schema: {
              $ref: "#/definitions/Plant"
            },
            required: true
          },
        ],
        responses: {
          200: {
            description: "Successful operation or plant already exists",
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: true,
                message: "Plant ID has been added to user.",
                data: {}
              }
            }
          },
          400: {
            description: "Bad request",
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: false,
                message: "Plant ID does not exist.",
                data: {}
              }
            }
          },
          500: {
            description: "Server error.",
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: false,
                message: "Server error or Plant required to create new Plant.",
                data: {}
              }
            }
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
        description: "Deletes a plant from the user's favourites in the database. Requires a User API token to produce a successful operation.",
        operationId: "deletePlantFromFavourites",
        produces: ["application/json"],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            description: 'User API token',
            required: true
          },
          {
            name: 'plant',
            in: 'body',
            description: 'Plant containing ID',
            schema: {
              $ref: "#/definitions/Plant"
            },
            required: true
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: true,
                message: "User no longer associated with plant.",
                data: {}
              }
            }
          },
          500: {
            description: "Server error",
            schema: {
              $ref: "#/definitions/ApiResponse"
            },
            examples: {
              "application/json": {
                success: false,
                message: "No plant reference to delete.",
                data: {}
              }
            }
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
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Successful operation.",
                data: {
                  plants: [
                    {
                      id: 1,
                      name: "Rick Rose"
                    },
                    {
                      id: 2,
                      name: "Wild Rose"
                    }
                  ]
                }
              }
            }
          },
          500: {
            description: "Server error",
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
          },
        },
      },
      post: {
        tags: ['plant'],
        summary: 'Create a plant in the database with form data',
        description: 'Creates a plant.',
        operationId: 'updatePlantWithForm',
        produces: ['application/json'],
        parameters: [
          {
            name: 'plant',
            in: 'body',
            description: 'New plant name',
            required: false,
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: "Rick Rose"
              },
            }
          },
        ],
        responses: {
          200: {
            description: 'Successful operation.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Sucessful operation.",
                data: {
                  plant: {
                    id: 1,
                    name: "Rick Rose"
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized error',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Plant already exists",
                data: {}
              }
            }
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
          },
        },
      },
      put: {
        tags: ["plant"],
        summary: "Updates a plant",
        description: "Updates a plant's field in the database.",
        operationId: "updatePlant",
        produces: ["application/json"],
        parameters: [
          {
            name: 'plant',
            in: 'body',
            description: 'Plant to update.',
            required: true,
            schema: {
              $ref: "#/definitions/Plant"
            }
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Plant ID updated to ...",
                data: {}
              }
            }
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
          },
        },
      },
      delete: {
        tags: ["plant"],
        summary: "Deletes a plant",
        description: "Deletes a specified plant from the database.",
        operationId: "deletePlant",
        produces: ["application/json"],
        parameters: [
          {
            name: 'plant',
            in: 'body',
            description: 'Plant to delete',
            required: true,
            schema: {
              $ref: "#/definitions/Plant"
            }
          },
        ],
        responses: {
          200: {
            description: "Successful operation.",
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Plant ID deleted.",
                data: {}
              }
            }
          },
          400: {
            description: 'Bad request.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Plant ID not found.",
                data: {}
              }
            }
          },
          500: {
            description: 'Server error.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Error message.",
                data: {}
              }
            }
          },
        },
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
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Successful operation.",
                data: {
                  plant: {
                    id: 1,
                    name: "Brandywine Tomato"
                  }
                }
              }
            }
          },
          401: {
            description: "Plant ID does not exist",
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Plant ID does not exist.",
                data: {
                  err: "Error message"
                }
              }
            }
          }
        },
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
            name: 'email',
            in: 'body',
            description: 'User email',
            required: true,
            schema: {
              type: "string",
              example: "elon@tesla.com"  
            }
          },
          {
            name: 'password',
            in: 'body',
            description: 'User password',
            required: true,
            schema: {
              type: "string",
              example: "s3cur3p4ssw0rd"
            }
          },
        ],
        responses: {
          200: {
            description: 'Successful operation.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Register successful.",
                data: {}
              }
            }
          },
          401: {
            description: 'Incomplete request.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "User already exists.",
                data: {}
              }
            }
          },
          500: {
            description: 'Server error.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
          },
        }
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
            name: 'email',
            in: 'body',
            description: 'User email',
            required: true,
            schema: {
              type: "string",
              example: "elon@tesla.com"  
            }
          },
          {
            name: 'password',
            in: 'body',
            description: 'User password',
            required: true,
            schema: {
              type: "string",
              example: "s3cur3p4ssw0rd"
            }
          },
        ],
        responses: {
          200: {
            description: 'Successful operation.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Login success.",
                data: {
                  user: {
                    id: 1,
                    email: "elon@tesla.com",
                    password: null,
                    isAdmin: true,
                    plantList: { ids: [1, 2, 3] }
                  }
                }
              }
            }
          },
          401: {
            description: "Auth failed or User does not exist.",
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Auth failed or User does not exist.",
                data: {}
              }
            }
          },
          403: {
            description: 'Incorrect credentials',
            examples: {
              "application/json": {
                success: false,
                message: "Incorrect credentials",
                data: {}
              }
            }
          },
          500: {
            description: 'Incorrect credentials',
            examples: {
              "application/json": {
                success: false,
                message: 'Server Failed to create token',
                data: {}
              }
            }
          },
        }
      },
    },
    '/auth/silentLogin': {
      post: {
        tags: ['auth'],
        summary: 'Gets user data',
        description: 'Returns the users data. Requires a User API token to produce a successful operation.',
        operationId: 'silentLogin',
        produces: ['application/json'],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            description: 'User API token',
            required: true
          },
        ],
        responses: {
          200: {
            description: 'Silent Login Success.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: true,
                message: "Successful operation.",
                data: {
                  user: {
                    id: 1,
                    email: "elon@tesla.com",
                    password: null,
                    isAdmin: true,
                    plantList: { ids: [1, 2, 3] }
                  }
                }
              }
            }
          },
          401: {
            description: 'User does not exist.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "User does not exist.",
                data: {}
              }
            }
          },
          500: {
            description: 'Internal server error (token is required for authentication).',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
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
        description: 'Fetches the number of requests for all endpoints. Requires an Admin API token to produce a successful operation.',
        operationId: 'getEndpointStats',
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            description: 'Admin API token',
            required: true
          },
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Successful operation.',
            schema: {
              $ref: '#/definitions/ApiResponse'
            },
            examples: {
              "application/json": {
                success: true,
                message: "Successful operation.",
                data: {
                  stats: [
                    {
                      id: 1,
                      method: "get",
                      endpoint: "/api/v1/admin/endpointStats",
                      requests: 1
                    }
                  ]
                }
              }
            }
          },
          500: {
            description: 'Internal server error (token is required for authentication).',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
            examples: {
              "application/json": {
                success: false,
                message: "Error message.",
                data: {}
              }
            }
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
            description: 'Successful operation.',
            schema: {
              $ref: '#/definitions/ApiResponse',
            },
          }
        }
      }
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
      required: ["email", "password", "isAdmin", "plantList"],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1
        },
        email: {
          type: "string",
          example: "elon@tesla.com",
        },
        password: {
          type: "string",
        },
        isAdmin: {
          type: "boolean"
        },
        plantList: {
          type: "object",
          properties: {
            ids: {
              type: "array",
              items: {
                type: 'int64'
              }
            },
          },
          example: { ids: [1, 2, 3] },
        }
      },
      xml: {
        name: "User",
      },
    },
    Plant: {
      type: "object",
      required: ["name"],
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
    Admin: {
      type: "object",
      required: ["method", "endpoint", "requests"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        method: {
          type: "string"
        },
        endpoint: {
          type: "string"
        },
        requests: {
          type: "integer",
          format: "int64"
        }
      },
      xml: {
        name: "Admin",
      },
    },
    ApiResponse: {
      type: 'object',
      properties: {
        success: {
          type: "boolean"
        },
        message: {
          type: "string",
          example: "Successful operation."
        },
        data: {
          type: "object"
        }
      },
      xml: {
        name: "ApiResponse",
      },
    }
  },
};

module.exports = {
  swaggerJSON,
};
