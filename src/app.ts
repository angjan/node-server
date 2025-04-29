import express from "express";
import helmet from "helmet";
import cors from "cors";

import itemRoutes from "./routes/itemRoutes";

import { errorHandler } from "./middlewares/errorHandler";
import Logger from "./lib/logger";
import morganMiddleware from "./middlewares/morganMiddleware";
import { options } from "./config/corsConfig";
const app = express();

// setup the logger
app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.use(morganMiddleware);
app.use(errorHandler);

app.use("/items", itemRoutes);
app.get("/logger", (_, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");

  res.send("Hello world");
});

export default app;
