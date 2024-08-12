import { Model, DataTypes, Sequelize } from "sequelize";

// Define the attributes for the Payment model
interface PaymentAttributes {
  id?: number; // Optional for auto-incremented ID
  amount: number; // Payment amount
  payment_date: Date; // Date of payment
  payment_method?: string; // Optional payment method
  invoice_id?: number; // Foreign key reference to Invoice
}

// Define the Payment model class
class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  public id!: number; // Auto-incrementing primary key
  public amount!: number; // Payment amount
  public payment_date!: Date; // Date of payment
  public payment_method?: string; // Optional payment method
  public invoice_id!: number; // Foreign key to Invoice

  // Define associations (if needed)
  public static associate(models: any) {
    Payment.belongsTo(models.Invoice, { foreignKey: "invoice_id" });
  }
}

// Initialize the model function
export const initPaymentModel = (sequelize: Sequelize) => {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      payment_method: {
        type: DataTypes.STRING,
      },
      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Optional foreign key
      },
    },
    {
      sequelize,
      tableName: "payments",
      timestamps: false, // Set to true if you want to manage createdAt and updatedAt
    }
  );
};

// Export the Payment model
export default Payment;
