import config from "../config/config";
const DEVELOPMENT = "development";

export const isDevelopment = () => config.nodeEnv === DEVELOPMENT;
