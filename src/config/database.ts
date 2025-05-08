import { Sequelize } from "sequelize-typescript";
import config from "./config";
import { User } from "../models/user.model";

const { dbUsername, dbPassword, dbName, dbHost } = config;
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: dbHost,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  models: [User], // Auto-load models
});
