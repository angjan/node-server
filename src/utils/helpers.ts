import config from "../config/config";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

export function isDevelopment() {
  return config.nodeEnv === "development";
}

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
