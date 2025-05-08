import { Request, Response } from "express";
import { handleController } from "./helpers";
import { HTTP_STATUS } from "./const";
import { User } from "../models/user.model";

export const getUsers = handleController(
  async (_req: Request, res: Response) => {
    const users = await User.findAll();
    res.status(HTTP_STATUS.OK).json(users);
  },
);
