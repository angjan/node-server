import { Request, Response, NextFunction } from "express";
import { Item, items } from "../models/item";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
} as const;

const MESSAGES = {
  itemNotFound: (id: number) => `Item with id ${id} not found`,
} as const;

const handleController =
  (fn: ControllerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

const findItemById = (id: number) => {
  const itemIndex = items.findIndex((item) => item.id === id);
  return { itemIndex, item: items[itemIndex] };
};

const parseId = (req: Request): number => parseInt(req.params.id, 10);

export const createItem = handleController(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newItem: Item = { id: Date.now(), name, description };
    items.push(newItem);
    res.status(HTTP_STATUS.CREATED).json(newItem);
  },
);

export const getItems = handleController(
  async (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json(items);
  },
);

export const updateItem = handleController(
  async (req: Request, res: Response) => {
    const id = parseId(req);
    const { itemIndex } = findItemById(id);

    if (itemIndex === -1) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: MESSAGES.itemNotFound(id) });
      return;
    }

    const { name } = req.body;
    items[itemIndex].name = name;
    res.status(HTTP_STATUS.OK).json(items[itemIndex]);
  },
);

export const getItemById = handleController(
  async (req: Request, res: Response) => {
    const id = parseId(req);
    const { item } = findItemById(id);

    if (!item) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: MESSAGES.itemNotFound(id) });
      return;
    }

    res.status(HTTP_STATUS.OK).json(item);
  },
);

export const deleteItem = handleController(
  async (req: Request, res: Response) => {
    const id = parseId(req);
    const { itemIndex } = findItemById(id);

    if (itemIndex === -1) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: MESSAGES.itemNotFound(id) });
      return;
    }

    const deletedItem = items.splice(itemIndex, 1);
    res.status(HTTP_STATUS.OK).json(deletedItem);
  },
);
