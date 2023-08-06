import Joi from "@hapi/joi";

const orderSchema = {
  id: Joi.number().integer().required(),
  cliente: Joi.string().required(),
  produto: Joi.string().required(),
  valor: Joi.number().required(),
  entregue: Joi.boolean().required(),
  timestap: Joi.date().required(),
};

const schemas = {
  getOrder: {
    id: Joi.number().integer().required(),
  },
  createOrder: Joi.object({
    cliente: Joi.string().required(),
    produto: Joi.string().required(),
    valor: Joi.number().required(),
  }),
  updateOrder: Joi.object({
    id: Joi.number().integer().required(),
    cliente: Joi.string().required(),
    produto: Joi.string().required(),
    valor: Joi.number().required(),
    entregue: Joi.boolean().required(),
  }),
  putOrders: Joi.object({
    pedidos: Joi.array().items(Joi.object(orderSchema)).required(),
    nextId: Joi.number().integer().required(),
  }),
  updateStatus: Joi.object({
    id: Joi.number().integer().required(),
    entregue: Joi.boolean().required(),
  }),
  deleteOrder: Joi.object({
    id: Joi.number().integer().required(),
  }),
  getClientTotalValue: Joi.object({
    cliente: Joi.string().required(),
  }),
  getProductTotalValue: Joi.object({
    produto: Joi.string().required(),
  }),
};

export default schemas;
