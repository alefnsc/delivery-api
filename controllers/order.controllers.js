import OrderService from "../services/order.services.js";
import orderSchema from "../schemas/order.schemas.js";
import Joi from "@hapi/joi";

async function createOrder(req, res, next) {
  try {
    const { error, value } = orderSchema.createOrder.validate(req.body);

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const order = await OrderService.createOrder(value);

    res.send(order);

    logger.info(`Post /orders - ${JSON.stringify(order)}`);
  } catch (err) {
    next(err);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await OrderService.getOrders();
    res.send(JSON.stringify(orders));

    logger.info(`Get /orders - ${JSON.stringify(orders)}`);
  } catch (err) {
    next(err);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { error, value } = orderSchema.updateOrder.validate(req.body);

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const updatedOrder = await OrderService.updateOrder(value);

    if (updatedOrder === 1) {
      throw new Error("Order id not found");
    }

    if (updatedOrder === 2) {
      throw new Error("The customer name must match");
    }

    res.send(JSON.stringify(updatedOrder));

    logger.info(`Put /orders - ${JSON.stringify(updatedOrder)}`);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { error, value } = orderSchema.updateStatus.validate(req.body);

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const updatedStatus = await OrderService.updateStatus(value);

    if (updatedStatus === 1) {
      throw new Error("Order id not found");
    }

    res.send(JSON.stringify(updatedStatus));

    logger.info(
      `Patch /orders/updateStatus - ${JSON.stringify(updatedStatus)}`
    );
  } catch (err) {
    next(err);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { error, value } = Joi.object({
      id: Joi.number().integer().required(),
    }).validate({
      id: parseInt(req.params.id),
    });

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const data = await OrderService.deleteOrder(value.id);

    res.send(JSON.stringify(data));

    logger.info(`Delete /orders/:id  - ${JSON.stringify(data)}`);
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const { error, value } = orderSchema.getOrder.id.validate(
      parseInt(req.params.id)
    );

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const order = await OrderService.getOrder(value);
    res.send(JSON.stringify(order));

    logger.info(`Get /orders/:id - ${JSON.stringify(order)}`);
  } catch (err) {
    next(err);
  }
}

async function getCustomerTotalValue(req, res, next) {
  try {
    const { error, value } = orderSchema.getCustomerTotalValue.validate(
      req.body
    );

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const totalValue = await OrderService.getCustomerTotalValue(value.cliente);

    res.send(JSON.stringify(totalValue));

    logger.info(
      `Post /orders/customerTotalValue - ${JSON.stringify(totalValue)}`
    );
  } catch (err) {
    next(err);
  }
}

async function getProductTotalValue(req, res, next) {
  try {
    const { error, value } = orderSchema.getProductTotalValue.validate(
      req.body
    );

    if (error) {
      throw new Error("Invalid input data: " + error.details[0].message);
    }

    const totalValue = await OrderService.getProductTotalValue(value.produto);

    res.send(JSON.stringify(totalValue));

    logger.info(
      `Post /orders/productTotalValue - ${JSON.stringify(totalValue)}`
    );
  } catch (err) {
    next(err);
  }
}

async function getMostWanted(req, res, next) {
  try {
    const orders = await OrderService.getMostWanted();
    res.send(JSON.stringify(orders));

    logger.info(`Get /orders/mostWanted - ${JSON.stringify(orders)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  updateStatus,
  deleteOrder,
  getCustomerTotalValue,
  getProductTotalValue,
  getMostWanted,
};
