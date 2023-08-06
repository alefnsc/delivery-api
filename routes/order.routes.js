import express from "express";
import OrderController from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/mostWanted", OrderController.getMostWanted);
router.get("/:id", OrderController.getOrder);
router.delete("/:id", OrderController.deleteOrder);
router.put("/", OrderController.updateOrder);
router.post("/customerTotalValue", OrderController.getCustomerTotalValue);
router.post("/productTotalValue", OrderController.getProductTotalValue);
router.patch("/updateStatus", OrderController.updateStatus);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
