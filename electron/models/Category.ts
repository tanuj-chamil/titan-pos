import { Model, DataTypes, Sequelize } from "sequelize";
// Define the attributes for the Category model
interface CategoryAttributes {
  id?: number; // Optional for creation
  name: string; // Category name
}

// Define the Category model class
class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number; // Auto-incrementing primary key
  public name!: string; // Category name

  // Define associations
  public static associate(models: any) {
    Category.hasMany(models.Product, { foreignKey: "category_id" });
  }
}

// Initialize the model function
export const initCategoryModel = (sequelize: Sequelize) => {
  Category.init(
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
    },
    {
      sequelize,
      tableName: "categories",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

// Export the Category model
export default Category;
