import { Request, Response } from "express";
import { ItemModel, items } from "../models/item.model";

import { findItemById, handleController, parseId } from "./helpers";
import { HTTP_STATUS, MESSAGES } from "./const";

export const createItem = handleController(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newItem: ItemModel = { id: Date.now(), name, description };
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
