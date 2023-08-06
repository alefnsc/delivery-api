import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

async function getOrders() {
  return JSON.parse(await readFile(filePath));
}

async function putOrders(data) {
  return writeFile(filePath, JSON.stringify(data, null, 2));
}

async function findOrder(id, data) {
  return data.pedidos.find((data) => data.id === id);
}

async function createOrder(order) {
  const data = await getOrders();

  order = {
    id: data.nextId++,
    cliente: order.cliente,
    produto: order.produto,
    valor: order.valor,
    entregue: false,
    timestap: new Date(),
  };

  data.pedidos.push(order);

  putOrders(data);

  return order;
}

async function updateOrder(order) {
  const data = await getOrders();
  const orderToUpdate = await findOrder(order.id, data);

  if (!orderToUpdate) {
    return 1;
  }
  if (order.cliente !== orderToUpdate.cliente) {
    return 2;
  }

  orderToUpdate.cliente = order.cliente;
  orderToUpdate.produto = order.produto;
  orderToUpdate.valor = order.valor;
  orderToUpdate.entregue = order.entregue;

  putOrders(data);

  return orderToUpdate;
}

async function updateStatus(order) {
  const data = await getOrders();
  const orderToUpdate = await findOrder(order.id, data);

  if (!orderToUpdate) {
    return 1;
  }

  orderToUpdate.entregue = order.entregue;

  putOrders(data);

  return orderToUpdate;
}

async function getOrder(id) {
  const data = await getOrders();
  return findOrder(id, data);
}

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  putOrders,
  updateStatus,
};
