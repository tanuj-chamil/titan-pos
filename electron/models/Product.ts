import { Model, DataTypes, Sequelize } from "sequelize";

interface ProductAttributes {
  id?: number; // Assuming you want to add an auto-incremented ID
  name: string;
  description?: string; // Optional field
  price: number;
  category_id?: number; // Foreign key reference to Category
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public category_id?: number; // Foreign key reference

  // Static method to define associations
  public static associate(models: any) {
    Product.belongsTo(models.Category, { foreignKey: "category_id" });
    Product.hasMany(models.InvoiceItem, { foreignKey: "product_id" });
    Product.hasMany(models.Inventory, { foreignKey: "product_id" });
  }
}

// Initialize the model
export const initProductModel = (sequelize: Sequelize) => {
  Product.init(
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
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

export default Product;
