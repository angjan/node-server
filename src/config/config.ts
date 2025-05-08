import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[] | undefined;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  dbHost: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(" "),
  dbUsername: process.env.DATABASE_USER || "postgres",
  dbPassword: process.env.DATABASE_PASSWORD || "",
  dbName: process.env.DATABASE_NAME || "postgres",
  dbHost: process.env.DATABASE_HOST || "127.0.0.1",
};

export default config;
