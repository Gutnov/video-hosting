import {
  Column,
  DataType,
  DefaultScope,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { CreationOptional } from 'sequelize';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Table({ tableName: 'users', paranoid: true, timestamps: true })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  @Unique(true)
  @Column({ type: DataType.STRING(64), allowNull: false })
  login: string;

  @Column({ type: DataType.STRING(128), allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(64), allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING(64), allowNull: false, defaultValue: '' })
  secondName: string;
}
