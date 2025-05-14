import config from "../config/config";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { redisClient } from "../config/redis";
import Logger from "../lib/logger";
import { LoginInput } from "../schemas/auth.schema";
import { Login } from "../models/auth.model";
import { User } from "../models/user.model";

const DEVELOPMENT = "development";

/** Duration of the session in seconds */
const SESSION_DURATION_SECONDS = 3600;

/** Structure of session data stored in Redis */
interface SessionData {
  name: string;
}

interface AuthenticatedUser {
  name: string;
  address: string;
  login: {
    email: string;
    id: number;
  };
}

export const isDevelopment = () => config.nodeEnv === DEVELOPMENT;

export const parseId = (req: Request): number => parseInt(req.params.id, 10);

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const handleController =
  (fn: ControllerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export const handleHashing = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, 10);
};

export const isMatch = async (value: string, hash: string) => {
  return await bcrypt.compare(value, hash);
};

export const createUserSession = async (
  email: string,
  name: string,
): Promise<string | null> => {
  const sessionData: SessionData = { name };

  try {
    return await redisClient.setEx(
      email,
      SESSION_DURATION_SECONDS,
      JSON.stringify(sessionData),
    );
  } catch (error) {
    Logger.error("Failed to create user session:", error);
    return null;
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginInput>,
): Promise<AuthenticatedUser | null> => {
  const { email, password } = req.body;

  const login = await Login.findOne({
    where: { email },
  });

  if (!login) return null;

  const isValid = await isMatch(password, login.passwordHash);

  if (isValid) {
    const userData = await User.findOne({
      where: { loginId: login.id },
      attributes: ["name", "address"],
      include: [
        {
          model: Login,
          attributes: ["email", "id"],
        },
      ],
    });

    return userData as AuthenticatedUser;
  }
  return null;
};
