const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_product_groups', {
    productGroupId: {
      autoIncrement: true, // Automatically increment this field
      type: DataTypes.INTEGER, // Integer type for product group ID
      allowNull: false, // Ensure product group ID is not null
      primaryKey: true, // Primary key for the product group
      comment: "Unique identifier for the product group"
    },
    productGroupName: {
      type: DataTypes.STRING(255), // Name of the product group
      allowNull: false, // Ensure product group name is not null
      comment: "Name of the product group",
      validate: {
        notEmpty: {
          msg: "Product group name cannot be empty."
        },
        is: {
          args: /^[a-zA-Z\s]*$/, // Only letters and spaces are allowed
          msg: "Product group name can only contain letters and spaces."
        },
        len: {
          args: [3, 255], // Ensures the name is between 3 and 255 characters
          msg: "Product group name must be between 3 and 255 characters."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_product_groups', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productGroupId" }
        ]
      }
    ]
  });
};
