const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_products', {
    productId: {
      type: DataTypes.STRING(255), // Unique identifier for the product
      allowNull: false, // Ensure that the product ID is not null
      primaryKey: true, // Primary key for the product
      comment: "Unique identifier for the product"
    },
    productName: {
      type: DataTypes.STRING(50), // Name of the product
      allowNull: true, // Allow null values if the name is not provided
      comment: "Name of the product"
    },
    productGroup: {
      type: DataTypes.STRING(50), // Group or category to which the product belongs
      allowNull: true, // Allow null values if the group is not specified
      comment: "Group or category of the product"
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
