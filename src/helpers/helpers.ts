import config from "../config/config";
import { NextFunction, Request, Response } from "express";

const DEVELOPMENT = "development";

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
