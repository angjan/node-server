import { createClient } from "redis";
import Logger from "../lib/logger";

export const redisClient = createClient({
  url: "redis://redis:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  await redisClient.connect();
  Logger.info("✅ Redis connected");
};
