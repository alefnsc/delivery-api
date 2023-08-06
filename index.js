import express from "express";
import OrderRouter from "./routes/order.routes.js";
import winston from "winston";
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "./doc/doc.js";
import cors from "cors";

global.filePath = "./json/pedidos.json";
const port = 3030;
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, errors } = format;

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  let logMessage = `${timestamp} [${label}] ${level}: ${message}`;
  if (level === "error" && stack) {
    logMessage += `\n${stack}`;
  }
  return logMessage;
});

global.logger = createLogger({
  level: "silly",
  format: combine(
    label({ label: "delivery-api" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/delivery-api.log" }),
  ],
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/orders", OrderRouter);
app.listen(port, async () => {
  try {
    logger.info("API Started!");
  } catch (err) {
    logger.error(err);
  }
});
