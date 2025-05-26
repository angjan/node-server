import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[] | undefined;
  dbURL: string;
  redisURL: string;
  jwtSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",

  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(" "),
  dbURL: process.env.DATABASE_URL || "localhost:5432/mydb",
  redisURL: process.env.REDIS_URL || "redis://localhost:6379",
  jwtSecret: process.env.JWT_SECRET || "supersecure",
};

export default config;
