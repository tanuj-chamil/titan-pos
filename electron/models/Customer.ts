import { Model, DataTypes, Sequelize } from "sequelize";

interface CustomerAttributes {
  id?: number; // Assuming you want to add an auto-incremented ID
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id!: number;
  public name!: string;
  public email?: string;
  public phone?: string;
  public address?: string;

  // Additional methods or virtuals can be added here
}

// Initialize the model
export const initCustomerModel = (sequelize: Sequelize) => {
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "customers",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

export default Customer;
