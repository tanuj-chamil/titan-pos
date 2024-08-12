import { Model, DataTypes, Sequelize } from "sequelize";

// Define the attributes for the Inventory model
interface InventoryAttributes {
  id?: number; // Optional for creation
  quantity: number; // Required quantity field
  last_updated?: Date; // Optional if you want to manage it automatically
}

// Define the Inventory model class
class Inventory
  extends Model<InventoryAttributes>
  implements InventoryAttributes
{
  public id!: number; // Auto-incrementing primary key
  public quantity!: number; // Quantity of the product
  public last_updated!: Date; // Date of the last update

  // Define associations (if needed)
  public static associate(models: any) {
    Inventory.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}

// Initialize the model function
export const initInventoryModel = (sequelize: Sequelize) => {
  Inventory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically sets the date when a record is created
      },
    },
    {
      sequelize,
      tableName: "inventories",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

// Export the Inventory model
export default Inventory;
