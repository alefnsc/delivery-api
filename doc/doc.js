export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Delivery API",
    version: "1.0.0",
    description: "API for managing orders",
  },
  servers: [
    {
      url: "http://localhost:3030",
    },
  ],
  paths: {
    "/orders": {
      post: {
        summary: "Create a new order",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Order created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      get: {
        summary: "Get all orders",
        responses: {
          200: {
            description: "List of orders",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Order",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update an order",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Order updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/orders/{id}": {
      get: {
        summary: "Get an order by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Order found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an order",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Order deleted successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/orders/mostWanted": {
      get: {
        summary: "Get most wanted products",
        responses: {
          200: {
            description: "List of most wanted products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/orders/customerTotalValue": {
      post: {
        summary: "Get total value for a customer",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/customerInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Total value for the customer",
            content: {
              "application/json": {
                schema: {
                  type: "number",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/orders/productTotalValue": {
      post: {
        summary: "Get total value for a product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Total value for the product",
            content: {
              "application/json": {
                schema: {
                  type: "number",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/orders/updateStatus": {
      patch: {
        summary: "Update order status",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateStatusInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Order status updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      OrderInput: {
        type: "object",
        properties: {
          cliente: {
            type: "string",
          },
          produto: {
            type: "string",
          },
          valor: {
            type: "number",
          },
        },
        required: ["cliente", "produto", "valor"],
      },
      Order: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          cliente: {
            type: "string",
          },
          produto: {
            type: "string",
          },
          valor: {
            type: "number",
          },
          entregue: {
            type: "boolean",
          },
          timestap: {
            type: "string",
            format: "date-time",
          },
        },
        required: ["id", "cliente", "produto", "valor", "entregue", "timestap"],
      },
      customerInput: {
        type: "object",
        properties: {
          cliente: {
            type: "string",
          },
        },
        required: ["cliente"],
      },
      ProductInput: {
        type: "object",
        properties: {
          produto: {
            type: "string",
          },
        },
        required: ["produto"],
      },
      UpdateStatusInput: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          entregue: {
            type: "boolean",
          },
        },
        required: ["id", "entregue"],
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
          },
        },
      },
    },
  },
};
