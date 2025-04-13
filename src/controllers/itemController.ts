import { Request, Response, NextFunction } from "express";
import { Item, items } from "../models/item";

export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const newItem: Item = { id: Date.now(), name, description };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

export const getItems = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const updateItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: `Item with id ${id} not found` });
      return;
    }
    items[itemIndex].name = name;
    res.status(200).json(items[itemIndex]);
  } catch (err) {
    next(err);
  }
};

export const getItemById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = items.find((item) => item.id === id);
    if (!item) {
      res.status(404).json({ message: `Item with id ${id} not found` });
      return;
    }
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: `Item with id ${id} not found` });
      return;
    }
    const deletedItem = items.splice(itemIndex, 1);
    res.status(200).json(deletedItem);
  } catch (err) {
    next(err);
  }
};
