import express from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import itemRoutes from "./routes/itemRoutes";

import { errorHandler } from "./middlewares/errorHandler";
const app = express();
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../", "logs", "access.log"),
  {
    flags: "a",
  },
);

// setup the logger
app.use(express.json());
app.use(morgan("dev", { stream: accessLogStream }));
app.use(errorHandler);

app.use("/items", itemRoutes);

export default app;
