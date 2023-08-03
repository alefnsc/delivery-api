import OrderRepository from "../repositories/order.repository.js";

async function createOrder(order) {
  return await OrderRepository.createOrder(order);
}

async function getOrders() {
  return await OrderRepository.getOrders();
}

async function getOrder(id) {
  return await OrderRepository.getOrder(id);
}

async function getClientTotalValue(cliente) {
  const clientData = await OrderRepository.getClientTotalValue(cliente);
  const total = clientData.reduce((acc, item) => acc + item.valor, 0);
  return total;
}

async function getProductTotalValue(produto) {
  const productData = await OrderRepository.getProductTotalValue(produto);
  const total = productData.reduce((acc, item) => acc + item.valor, 0);
  return total;
}

async function getMostWanted() {
  const productsCountMap = new Map();

  const deliveredOrders = await OrderRepository.getMostWanted();
  deliveredOrders.forEach((order) => {
    const product = order.produto;

    if (productsCountMap.has(product)) {
      productsCountMap.set(product, productsCountMap.get(product) + 1);
    } else {
      productsCountMap.set(product, 1);
    }
  });

  const sortedProducts = [...productsCountMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([product, count]) => `${product} - ${count}`);

  return sortedProducts;
}

async function updateOrder(order) {
  return await OrderRepository.updateOrder(order);
}

async function updateStatus(order) {
  return await OrderRepository.updateStatus(order);
}

async function deleteOrder(id) {
  return OrderRepository.deleteOrder(id);
}

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateStatus,
  deleteOrder,
  getClientTotalValue,
  getProductTotalValue,
  getMostWanted,
};
