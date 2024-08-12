import { Model, DataTypes, Sequelize } from "sequelize";

// Define the attributes for the InvoiceItem model
interface InvoiceItemAttributes {
  id?: number; // Optional for auto-incremented ID
  quantity: number; // Quantity of the item
  item_price: number; // Price per item
  total_price: number; // Total price for the quantity
  invoice_id?: number; // Foreign key reference to Invoice
  product_id?: number; // Foreign key reference to Product
}

// Define the InvoiceItem model class
class InvoiceItem
  extends Model<InvoiceItemAttributes>
  implements InvoiceItemAttributes
{
  public id!: number; // Auto-incrementing primary key
  public quantity!: number; // Quantity of the item
  public item_price!: number; // Price per item
  public total_price!: number; // Total price for the quantity
  public invoice_id!: number; // Foreign key to Invoice
  public product_id!: number; // Foreign key to Product

  // Define associations (if needed)
  public static associate(models: any) {
    InvoiceItem.belongsTo(models.Invoice, { foreignKey: "invoice_id" });
    InvoiceItem.belongsTo(models.Product, { foreignKey: "product_id" });
  }
}

// Initialize the model function
export const initInvoiceItemModel = (sequelize: Sequelize) => {
  InvoiceItem.init(
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
      item_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Optional foreign key
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Optional foreign key
      },
    },
    {
      sequelize,
      tableName: "invoice_items",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

// Export the InvoiceItem model
export default InvoiceItem;
