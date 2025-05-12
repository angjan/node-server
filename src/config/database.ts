import { Sequelize } from "sequelize-typescript";
import config from "./config";
import { User } from "../models/user.model";
import { Login } from "../models/auth.model";

const { dbUsername, dbPassword, dbName, dbHost } = config;
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: dbHost,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  models: [User, Login], // Auto-load models
});

export const getTransaction = async () => {
  return await sequelize.transaction();
};
