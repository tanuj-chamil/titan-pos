import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class User extends Model {
  declare username: string;
  declare admin: number;
  declare passhash: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1]], // Admin can only be 0 or 1
      },
    },
    passhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false, // Set to true if you want to manage createdAt and updatedAt
  }
);

export default User;
