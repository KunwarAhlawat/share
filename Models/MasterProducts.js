const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_products', {
    productId: {
      type: DataTypes.STRING(255), // Unique identifier for the product
      allowNull: false, // Ensure that the product ID is not null
      primaryKey: true, // Primary key for the product
      comment: "Unique identifier for the product",
      validate: {
        notEmpty: {
          msg: "Product ID cannot be empty."
        },
        isAlphanumeric: {
          msg: "Product ID must be alphanumeric."
        }
      }
    },
    productName: {
      type: DataTypes.STRING(50), // Name of the product
      allowNull: false, // Ensure that the product name is not null
      comment: "Name of the product",
      validate: {
        notEmpty: {
          msg: "Product name cannot be empty."
        },
        is: {
          args: /^[a-zA-Z\s]*$/, // Product name can only contain letters and spaces
          msg: "Product name can only contain letters and spaces."
        },
        len: {
          args: [3, 50], // Product name should be between 3 and 50 characters
          msg: "Product name must be between 3 and 50 characters."
        }
      }
    },
    productGroup: {
      type: DataTypes.STRING(50), // Group or category to which the product belongs
      allowNull: true, // Allow null values if the group is not specified
      comment: "Group or category of the product",
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/, // Product group can only contain letters and spaces
          msg: "Product group can only contain letters and spaces."
        },
        len: {
          args: [3, 50], // Product group name should be between 3 and 50 characters
          msg: "Product group must be between 3 and 50 characters."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_products', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" }
        ]
      }
    ]
  });
};
