import jwt from "jsonwebtoken";
import config from "../config/config";

const { jwtSecret } = config;

const EXPIRES_IN = "1h"; // time after which the token expires

export function signJwt(id: string): string {
  return jwt.sign({ id }, jwtSecret, { expiresIn: EXPIRES_IN });
}

export function verifyToken<T>(token: string): T | null {
  try {
    return jwt.verify(token, jwtSecret) as T;
  } catch {
    return null;
  }
}
