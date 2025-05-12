import { Table, Column, Model, DataType, HasOne } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Login extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash!: string;

  @HasOne(() => User)
  user!: User;
}
