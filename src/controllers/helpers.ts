import { NextFunction, Request, Response } from "express";
import { items } from "../models/item.model";

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

export const parseId = (req: Request): number => parseInt(req.params.id, 10);

export const findItemById = (id: number) => {
  const itemIndex = items.findIndex((item) => item.id === id);
  return { itemIndex, item: items[itemIndex] };
};
