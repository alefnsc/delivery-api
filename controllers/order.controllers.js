import OrderService from "../services/order.services.js";

async function createOrder(req, res, next) {
  try {
    let order = req.body;

    let requiredFields = ["cliente", "produto", "valor"];

    requiredFields.forEach((field) => {
      if (!order[field] || order[field] === null) {
        throw new Error(`O campo ${field} é obrigatório.`);
      }
    });

    order = await OrderService.createOrder(order);

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
    let order = req.body;
    let requiredFields = ["id", "cliente", "produto", "valor", "entregue"];

    requiredFields.forEach((field) => {
      if (order[field] === null) {
        throw new Error(`O campo ${field} é obrigatório.`);
      }
    });

    const updatedOrder = await OrderService.updateOrder(order);

    if (updatedOrder === 1) {
      throw new Error("Número do pedido não encontrado");
    }

    if (updatedOrder === 2) {
      throw new Error(
        "O nome do cliente fornecido não corresponde ao nome do cliente no pedido alvo."
      );
    }

    res.send(JSON.stringify(updatedOrder));

    logger.info(`Put /orders - ${JSON.stringify(updatedOrder)}`);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    let order = req.body;
    let requiredFields = ["id", "entregue"];

    requiredFields.forEach((field) => {
      if (order[field] === null) {
        throw new Error(`O campo ${field} é obrigatório.`);
      }
    });

    if (typeof order.entregue !== "boolean") {
      throw new Error(
        "O campo entregue precisa ser atualizado com um valor 'true' ou 'false'."
      );
    }

    const updatedStatus = await OrderService.updateStatus(order);

    if (!updatedStatus === 1) {
      throw new Error("Número do pedido não encontrado");
    }

    res.send(JSON.stringify(updatedStatus));

    logger.info(`Put /orders - ${JSON.stringify(updatedStatus)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteOrder(req, res, next) {
  try {
    let id = parseInt(req.params.id);

    if (id === null) {
      throw new Error(`O campo ${id} é obrigatório.`);
    }

    const order = await OrderService.deleteOrder(id);

    res.send(JSON.stringify(order));

    logger.info(`Delete /orders - ${JSON.stringify(order)}`);
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    let id = parseInt(req.params.id);

    if (id === null) {
      throw new Error(`O campo ${id} é obrigatório.`);
    }
    const order = await OrderService.getOrder(id);
    res.send(JSON.stringify(order));

    logger.info(`Get /orders/:id - ${JSON.stringify(order)}`);
  } catch (err) {
    next(err);
  }
}

async function getClientTotalValue(req, res, next) {
  try {
    let body = req.body;

    if (!body.cliente || body.cliente === null) {
      throw new Error(`O campo ${body.cliente} é obrigatório.`);
    }

    const totalValue = await OrderService.getClientTotalValue(body.cliente);

    res.send(JSON.stringify(totalValue));

    logger.info(`Post /orders/totalValue - ${JSON.stringify(totalValue)}`);
  } catch (err) {
    next(err);
  }
}

async function getProductTotalValue(req, res, next) {
  try {
    let body = req.body;

    if (!body.produto || body.produto === null) {
      throw new Error(`O campo ${body.produto} é obrigatório.`);
    }

    const totalValue = await OrderService.getProductTotalValue(body.produto);

    res.send(JSON.stringify(totalValue));

    logger.info(`Post /orders/totalValue - ${JSON.stringify(totalValue)}`);
  } catch (err) {
    next(err);
  }
}

async function getMostWanted(req, res, next) {
  try {
    const orders = await OrderService.getMostWanted();
    res.send(JSON.stringify(orders));

    logger.info(`Get /orders/getMostWanted - ${JSON.stringify(orders)}`);
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
  getClientTotalValue,
  getProductTotalValue,
  getMostWanted,
};
