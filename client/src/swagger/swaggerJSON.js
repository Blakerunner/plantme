const swaggerJSON = {
  swagger: "2.0",
  info: {
    description:
      "This is the API documentation for the Plantme, an API server dedicated to providing data about plants.",
    version: "1.0.0",
    title: "Plantme API",
  },
  host: "plantme.blakerunner.com",
  basePath: "/api/v1",
  tags: [
    {
      name: "plant",
      description: "Operations about plants",
    },
  ],
  schemes: ["https"],
  paths: {
    "/plants": {
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
      post: {
        tags: ["plant"],
        summary: "Create a plant in the database with form data",
        description: "Creates a plant.",
        operationId: "updatePlantWithForm",
        consumes: ["application/x-www-form-urlencoded"],
        produces: ["application/json"],
        parameters: [
          {
            name: "plantId",
            in: "path",
            description: "ID of plant that needs to be created",
            required: true,
            type: "integer",
            format: "int64",
          },
          {
            name: "name",
            in: "formData",
            description: "Created name of the plant",
            required: false,
            type: "string",
          },
          {
            name: "status",
            in: "formData",
            description: "Created status of the plant",
            required: false,
            type: "string",
          },
        ],
        responses: {
          405: {
            description: "Invalid input",
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
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "plantId",
            in: "path",
            description: "Plant ID to delete",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
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
      put: {
        tags: ["plant"],
        summary: "Updates a plant",
        description: "Updates a plant's field in the database.",
        operationId: "updatePlant",
        produces: ["application/xml", "application/json"],
        parameters: [
          {
            name: "api_key",
            in: "header",
            required: false,
            type: "string",
          },
          {
            name: "plantId",
            in: "path",
            description: "Plant ID to delete",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
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
  },
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
  },
  definitions: {
    Plant: {
      type: "object",
      required: ["name", "photoUrls"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
          example: "doggie",
        },
      },
      xml: {
        name: "Plant",
      },
    },
    ApiResponse: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};

module.exports = {
  swaggerJSON,
};
