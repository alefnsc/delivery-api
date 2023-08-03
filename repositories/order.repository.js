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

async function deleteOrder(id) {
  const data = await getOrders();
  data.pedidos = data.pedidos.filter((pedido) => pedido.id !== id);
  putOrders(data);
  return data;
}

async function getOrder(id) {
  const data = await getOrders();
  return findOrder(id, data);
}

async function getClientTotalValue(cliente) {
  const data = await getOrders();
  const clientData = data.pedidos.filter(
    (data) => data.cliente === cliente && data.entregue === true
  );
  return clientData;
}

async function getProductTotalValue(produto) {
  const data = await getOrders();
  const productData = data.pedidos.filter(
    (data) => data.produto === produto && data.entregue === true
  );
  return productData;
}

async function getMostWanted() {
  const data = await getOrders();
  const deliveredOrders = data.pedidos.filter((data) => data.entregue === true);
  return deliveredOrders;
}

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  putOrders,
  updateStatus,
  deleteOrder,
  getClientTotalValue,
  getProductTotalValue,
  getMostWanted,
};
