import { redisClient } from "../config/redis";
import Logger from "../lib/logger";

/** Duration of the session in seconds */
const SESSION_DURATION_SECONDS = 3600;

/** Structure of session data stored in Redis */
interface SessionDataStoredInRedis {
  name: string;
  email: string;
  loginId: number;
}

interface SessionData extends SessionDataStoredInRedis {
  id: number;
}

export const createUserSession = async (
  data: SessionData,
): Promise<number | null> => {
  const { id, loginId, email, name } = data;
  const redisKey = `user:${id}`;
  try {
    const redisRes = await redisClient.hSet(redisKey, {
      loginId,
      email,
      name,
    });

    await redisClient.expire(redisKey, SESSION_DURATION_SECONDS);
    return redisRes;
  } catch (error) {
    Logger.error("Failed to create user session:", error);
    return null;
  }
};
