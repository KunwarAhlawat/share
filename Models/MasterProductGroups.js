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
      allowNull: true, // Allow null if name is not provided
      comment: "Name of the product group"
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
