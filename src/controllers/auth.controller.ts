import { Request, Response } from "express";
import { RegisterInput } from "../schemas/auth.schema";
import {
  loginUserHandler,
  performUserRegistration,
} from "../services/auth.service";
import { HTTP_STATUS } from "../const/const";

import { ConflictError, NotFoundError } from "../utils/errors";

export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
): Promise<void> => {
  try {
    const result = await performUserRegistration(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
    return;
  } catch (error) {
    if (error instanceof ConflictError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    throw error;
  }
};

export const loginUserAuthentication = async (req: Request, res: Response) => {
  try {
    const authResult = await loginUserHandler(req);

    res.status(HTTP_STATUS.OK).json(authResult);
    return;
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    throw error;
  }
};
