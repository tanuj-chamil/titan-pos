import { Model, DataTypes, Sequelize } from "sequelize";

// Define the attributes for the Invoice model
interface InvoiceAttributes {
  id?: number; // Optional for creation
  invoice_number: string;
  invoice_date?: Date; // Optional if you want to manage it automatically
  subtotal: number;
  tax_amount?: number; // Optional for tax amount
  discount_amount?: number; // Optional for discount amount
  total_amount: number;
  payment_status: string;
  payment_method?: string; // Optional for payment method
}

// Define the Invoice model class
class Invoice extends Model<InvoiceAttributes> implements InvoiceAttributes {
  public id!: number; // Auto-incrementing primary key
  public invoice_number!: string; // Unique invoice number
  public invoice_date!: Date; // Date of the invoice
  public subtotal!: number; // Subtotal amount
  public tax_amount!: number; // Optional tax amount
  public discount_amount!: number; // Optional discount amount
  public total_amount!: number; // Total amount after tax and discount
  public payment_status!: string; // Payment status
  public payment_method!: string; // Optional payment method

  // Define associations (if needed)
  public static associate(models: any) {
    Invoice.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Invoice.hasMany(models.InvoiceItem, { foreignKey: "invoice_id" });
  }
}

// Initialize the model function
export const initInvoiceModel = (sequelize: Sequelize) => {
  Invoice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      invoice_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // Allow null for optional field
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // Allow null for optional field
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null for optional field
      },
    },
    {
      sequelize,
      tableName: "invoices",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

// Export the Invoice model
export default Invoice;
