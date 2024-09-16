const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return  sequelize.define('customer_contacts', {
    contactId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    customerId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'master_customers',
        key: 'customerId'
      },
      comment: "ID of the customer from the 'MasterCustomers' model"
    },
    contactName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customer_contacts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "contactId" }]
      }
    ]
  });

  
};
