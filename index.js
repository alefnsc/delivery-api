import express from "express";
import OrderRouter from "./routes/order.routes.js";
import winston from "winston";

global.filePath = "./json/pedidos.json";
const app = express();
app.use(express.json());

// Configure o Winston conforme seu código
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
    new transports.File({ filename: "delivery-api.log" }),
  ],
});

app.use("/orders", OrderRouter);
app.listen(3000, async () => {
  try {
    logger.info("API Started!");
  } catch (err) {
    logger.error(err);
  }
});
