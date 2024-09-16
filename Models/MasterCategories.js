const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_categories', {
    categoryId: {
      type: DataTypes.STRING(255), // ID for the category
      allowNull: false, // Ensuring the primary key is not null
      primaryKey: true, // Primary key field
      comment: "Unique identifier for the category"
    },
    categoryName: {
      type: DataTypes.STRING(255), // Name of the category
      allowNull: false, // Name must be provided
      defaultValue: '', // Default empty string
      comment: "Name or type of the category"
    }
  }, {
    sequelize,
    tableName: 'master_categories', // Database table name
    timestamps: true, // CreatedAt and UpdatedAt columns
    indexes: [
      {
        name: "PRIMARY", // Primary key index
        unique: true, // Ensuring uniqueness for the primary key
        using: "BTREE",
        fields: [{ name: "categoryId" }] // Indexed on the primary key field
      }
    ]
  });
};
