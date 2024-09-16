const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers_firms', {
   
    customerId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'master_customers',
        key: 'customerId'
      },
      comment: "ID of the customer from the 'MasterCustomers' model"
    },
    firmId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'master_firms',
        key: 'firmId'
      },
      comment: "ID of the firm from the 'MasterFirms' model"
    }
  }, {
    sequelize,
    tableName: 'customers_firms',
    timestamps: true,
    indexes: [
   
      {
        name: "customer_firm_index",
        using: "BTREE",
        fields: [
          { name: "customerId" },
          { name: "firmId" }
        ]
      }
    ]
  });
};
