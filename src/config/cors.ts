import { CorsOptions } from "cors";
import config from "./config";

const allowedOrigins = config.allowedOrigins;

export const options: CorsOptions = {
  origin: allowedOrigins,
};
