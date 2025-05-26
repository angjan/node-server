import { Transaction } from "sequelize";
import { Login } from "../models/auth.model";
import { User } from "../models/user.model";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { handleHashing, isMatch } from "../utils/helpers";
import { MESSAGES } from "../const/const";
import { getTransaction } from "../config/database";
import { signJwt } from "./jwt.service";
import { Request } from "express";
import { createUserSession } from "./redis.service";
import { ConflictError, NotFoundError } from "../utils/errors";

export interface AuthResult {
  token: string;
}

export const getLogin = async (
  email: string,
  transaction: Transaction,
): Promise<Login | null> => {
  return Login.findOne({
    where: { email },
    transaction,
  });
};

export const createUserLogin = async (
  email: string,
  password: string,
  transaction: Transaction,
): Promise<Login> => {
  const passwordHash = await handleHashing(password);
  return await Login.create({ email, passwordHash }, { transaction });
};

export const createUserProfile = async (
  data: { name: string; email: string; address?: string; loginId: number },
  transaction: Transaction,
): Promise<User> => {
  return await User.create(data, { transaction });
};

export const performUserRegistration = async (
  userData: RegisterInput,
): Promise<AuthResult> => {
  const { email, name, password, address } = userData;
  const transaction = await getTransaction();

  try {
    if (await getLogin(email, transaction)) {
      throw new ConflictError(MESSAGES.loginExists);
    }

    const login = await createUserLogin(email, password, transaction);
    const user = await createUserProfile(
      { name, email, address, loginId: login.id },
      transaction,
    );

    await transaction.commit();
    const token = signJwt(login.id.toString());
    await createUserSession({ loginId: login.id, email, name, id: user.id });
    return {
      token,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginInput>,
): Promise<AuthResult> => {
  const { email, password } = req.body;

  const transaction = await getTransaction();
  const login = await getLogin(email, transaction);

  if (!login || !(await isMatch(password, login.passwordHash))) {
    await transaction.rollback();
    throw new NotFoundError(MESSAGES.loginNotFound);
  }

  const user = await User.findOne({ where: { loginId: login.id } });
  if (!user) {
    await transaction.rollback();
    throw new NotFoundError(MESSAGES.loginNotFound);
  }
  const { name, id } = user;

  // ✅ JWT-based
  const token = signJwt(login.id.toString());

  await createUserSession({ loginId: login.id, email, name, id });

  return { token };
};
