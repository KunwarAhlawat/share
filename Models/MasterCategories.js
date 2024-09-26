const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_categories', {
    categoryId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the category",
      validate: {
        notEmpty: {
          msg: "Category ID cannot be empty."
        },
        len: {
          args: [1, 255],
          msg: "Category ID must be between 1 and 255 characters long."
        },
        isAlphanumeric: {
          msg: "Category ID must contain only letters and numbers." // No spaces allowed
        }
      }
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      comment: "Name or type of the category",
      validate: {
        notEmpty: {
          msg: "Category name cannot be empty."
        },
        len: {
          args: [1, 255],
          msg: "Category name must be between 1 and 255 characters long."
        },
        is: {
          args: /^[a-zA-Z0-9\s]+$/, // Allows letters, numbers, and spaces
          msg: "Category name can only contain letters, numbers, and spaces."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_categories',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "categoryId" }]
      }
    ]
  });
};
