import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Login } from "../models/auth.model";

import { HTTP_STATUS, MESSAGES } from "../const/const";
import { getTransaction } from "../config/database";
import { User } from "../models/user.model";
import { RegisterInput } from "../schemas/auth.schema";

export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
) => {
  const { email, name, password, address } = req.body;

  const t = await getTransaction(); // start transaction

  try {
    const existingLogin = await Login.findOne({
      where: { email },
      transaction: t,
    });
    if (existingLogin) {
      await t.rollback(); // rollback if login already exists
      res.status(HTTP_STATUS.CONFLICT).json(MESSAGES.loginExists);
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const login = await Login.create(
      { email, passwordHash: hash },
      { transaction: t },
    );

    const user = await User.create(
      {
        name,
        email,
        address,
        loginId: login.id,
      },
      { transaction: t },
    );

    await t.commit(); // commit if all succeeds

    res.status(HTTP_STATUS.CREATED).json({ ...login, ...user });
    return;
  } catch (err) {
    await t.rollback(); // rollback on error
    throw err;
  }
};
