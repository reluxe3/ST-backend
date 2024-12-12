import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import { UserAttributes } from '../types/auth'

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public name!: string
  public phonenumber!: string
  public dni!: string
  public email!: string
  public password!: string
  public isAdmin!: boolean
  public modules!: UserAttributes['modules']
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phonenumber: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    modules: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        administrativo: { access: false },
        ventas: { access: false, confectionery: false, crafts: false, mass: false },
        alquileres: { access: false, santaCatalina: false, goyoneche: false, santaMarta: false },
      },
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
)

export default User