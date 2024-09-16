const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_products', {

    customerId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'master_customers',
        key: 'customerId' // Match the primary key of MasterCustomers
      },
      comment: "ID of the customer from the 'MasterCustomers' model"
    },
    productId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'master_products',
        key: 'productId' // Match the primary key of MasterProducts
      },
      comment: "ID of the product from the 'MasterProducts' model"
    }
  }, {
    sequelize,
    tableName: 'customer_products',
    timestamps: true,
    indexes: [
     
      {
        name: "customer_product_index",
        using: "BTREE",
        fields: [
          { name: "customerId" },
          { name: "productId" }
        ]
      }
    ]
  });
};
