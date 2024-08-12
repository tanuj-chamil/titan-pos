import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";

class Session extends Model {
  public declare id: number;
  public declare sessionuuid: string;
  public declare username: string;
  public declare starttimestamp: string;
  public declare endtimestamp?: string; // Optional
  public declare active: number;
}

// Initialize the model
Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionuuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starttimestamp: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    endtimestamp: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1]], // Active can only be 0 or 1
      },
    },
  },
  {
    sequelize,
    tableName: "sessions",
    timestamps: false, // Set to true if you want to manage createdAt and updatedAt
  }
);

export default Session;
