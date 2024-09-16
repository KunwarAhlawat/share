const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers_categories', {
   
    customerId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'master_customers',
        key: 'customerId'
      },
      comment: "ID of the customer from the 'MasterCustomers' model"
    },
    categoryId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'master_categories',
        key: 'categoryId'
      },
      comment: "ID of the category from the 'MasterCategories' model"
    }
  }, {
    sequelize,
    tableName: 'customers_categories',
    timestamps: true,
    indexes: [
    
      {
        name: "customer_category_index",
        using: "BTREE",
        fields: [
          { name: "customerId" },
          { name: "categoryId" }
        ]
      }
    ]
  });
};
