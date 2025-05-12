import { Request, Response } from "express";
import { handleController, parseId } from "../helpers/helpers";
import { HTTP_STATUS, MESSAGES } from "../const/const";
import { User } from "../models/user.model";

export const getUsers = handleController(
  async (_req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(HTTP_STATUS.OK).json(users);
  },
);

export const getUserById = handleController(
  async (req: Request, res: Response) => {
    const id = parseId(req);
    const user = await User.findByPk(id);
    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json(MESSAGES.userNotFound(id));
      return;
    }
    res.status(HTTP_STATUS.OK).json(user);
  },
);

export const updateUser = handleController(
  async (req: Request, res: Response) => {
    const id = parseId(req);
    const { name, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json(MESSAGES.userNotFound(id));
      return;
    }

    user.name = name ?? user.name;
    user.address = email ?? user.address;
    await user.save();
    res.status(HTTP_STATUS.OK).json(user);
  },
);
export const deleteUser = handleController(
  async (req: Request, res: Response) => {
    const id = parseId(req);
    const user = await User.findByPk(id);
    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json(MESSAGES.userNotFound(id));
      return;
    }
    await user.destroy();
    res.status(HTTP_STATUS.OK).json(MESSAGES.userDeleted(id));
  },
);
