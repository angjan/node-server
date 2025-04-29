import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[] | undefined;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(" "),
};

export default config;
