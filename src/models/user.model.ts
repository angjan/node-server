import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Login } from "./auth.model";

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  address!: string;

  @ForeignKey(() => Login)
  @Column
  loginId!: number;

  @BelongsTo(() => Login)
  login?: Login;
}
