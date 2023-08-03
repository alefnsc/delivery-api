import express from "express";
import OrderController from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/", OrderController.createOrder);

router.get("/", OrderController.getOrders);

router.get("/mostWanted", OrderController.getMostWanted);

router.get("/:id", OrderController.getOrder);

router.post("/clientTotalValue", OrderController.getClientTotalValue);

router.post("/productTotalValue", OrderController.getProductTotalValue);

router.put("/", OrderController.updateOrder);

router.put("/updateStatus", OrderController.updateStatus);

router.delete("/:id", OrderController.deleteOrder);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
