const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_firms', {
    firmId: {
      type: DataTypes.STRING(255), // Unique identifier for the firm
      allowNull: false, // Firm ID should not be null
      primaryKey: true,
      comment: "Unique identifier for the firm"
    },
    firmName: {
      type: DataTypes.STRING(255), // Name of the firm
      allowNull: true,
      comment: "Name of the firm"
    },
    address: {
      type: DataTypes.STRING(255), // Address of the firm
      allowNull: true,
      comment: "Address of the firm"
    },
    pincode: {
      type: DataTypes.INTEGER, // Postal code
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Postal code of the firm's address"
    },
    GSTNumber: {
      type: DataTypes.STRING(50), // GST number (if applicable)
      allowNull: true,
      defaultValue: null, // Use null for unset values
      unique: true, // Ensure GST number is unique
      comment: "GST number of the firm"
    },
    accountNumber: {
      type: DataTypes.BIGINT, // Bank account number
      allowNull: true,
      unique: true, // Ensure bank account number is unique
      comment: "Bank account number of the firm"
    },
    bankName: {
      type: DataTypes.STRING(50), // Name of the bank
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Name of the bank where the firm holds an account"
    },
    IFSCcode: {
      type: DataTypes.STRING(50), // IFSC code for bank transactions
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "IFSC code of the firm's bank"
    },
    productProduced: {
      type: DataTypes.STRING(255), // Products produced by the firm
      allowNull: true,
      comment: "Products produced by the firm"
    },
    quantity: {
      type: DataTypes.INTEGER, // Quantity produced or handled by the firm
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Quantity of products produced or handled by the firm"
    }
  }, {
    sequelize,
    tableName: 'master_firms', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [{ name: "firmId" }]
      },
      {
        name: "unique_gstNumber", // Index to ensure unique GSTNumber
        unique: true,
        using: "BTREE",
        fields: [{ name: "GSTNumber" }]
      },
      {
        name: "unique_accountNumber", // Index to ensure unique accountNumber
        unique: true,
        using: "BTREE",
        fields: [{ name: "accountNumber" }]
      }
    ]
  });
};
