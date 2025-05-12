import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import userRoutes from "./routes/user.routes";

import { errorHandler } from "./middlewares/errorHandler";
import morganMiddleware from "./middlewares/morganMiddleware";
import { options } from "./config/cors";
const app = express();

app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.use(morganMiddleware);

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
