import express from "express";
import helmet from "helmet";
import cors from "cors";

import itemRoutes from "./routes/itemRoutes";
import loggerRoutes from "./routes/loggerRoutes";

import { errorHandler } from "./middlewares/errorHandler";
import morganMiddleware from "./middlewares/morganMiddleware";
import { options } from "./config/corsConfig";
const app = express();

app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.use(morganMiddleware);
app.use("/items", itemRoutes);
app.use("/logger", loggerRoutes);

app.use(errorHandler);

export default app;
