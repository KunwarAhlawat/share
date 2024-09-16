const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_customers', {
    customerId: {
      type: DataTypes.STRING(255), // Customer unique identifier
      allowNull: false, // Primary key should not allow null
      primaryKey: true, 
      comment: "Unique identifier for the customer"
    },
    customerCode: {
      type: DataTypes.STRING(255), // Code for the customer
      allowNull: false, // This is essential
      unique: true, // Make customerCode unique
      comment: "Unique code representing the customer"
    },
    customerName: {
      type: DataTypes.STRING(255), // Full name of the customer
      allowNull: false, // Customer name should not be null
      comment: "Customer's full name"
    },
    areaId: {
      type: DataTypes.INTEGER, // Geographical area - references to master_areas table,as many to one
      allowNull: true, 
      comment: "Customer's area (change or refine later)",
      references: {
        model: 'master_areas',
        key: 'areaId'
      },
    },
    status: {
      type: DataTypes.ENUM('VERIFIED', 'UNVERIFIED'), // Customer status
      allowNull: false, // Mandatory to indicate verification status
      defaultValue: 'UNVERIFIED', // Default to UNVERIFIED
      comment: "Verification status of the customer"
    },
    gradeId: {
      type: DataTypes.INTEGER, // references to master_areas table,as many to one
      allowNull: true,
      comment: "Customer grade or classification",
      references: {
        model: 'master_grades',
        key: 'gradeId'
      },
    },
    pincode: {
      type: DataTypes.INTEGER, // Pincode of the customer's location
      allowNull: true,
      comment: "Area postal code"
    },
    address: {
      type: DataTypes.STRING(255), // Address information
      allowNull: true,
      comment: "Customer's complete address"
    },
    referenceName1: {
      type: DataTypes.STRING(255), // First reference name
      allowNull: true,
      comment: "First reference person for the customer"
    },
    reference1ContactNumber: {
      type: DataTypes.STRING(255), // Contact number of reference 1
      allowNull: true,
      comment: "Contact number of the first reference"
    },
    referenceName2: {
      type: DataTypes.STRING(255), // Second reference name
      allowNull: true,
      comment: "Second reference person for the customer"
    },
    reference2ContactNumber: {
      type: DataTypes.STRING(255), // Contact number of reference 2
      allowNull: true,
      comment: "Contact number of the second reference"
    },
    creditLimit: {
      type: DataTypes.INTEGER, // Credit limit assigned to the customer
      allowNull: true,
      defaultValue: 0, // Default credit limit to 0
      comment: "Credit limit for the customer"
    },
    creditDays: {
      type: DataTypes.INTEGER, // Number of credit days allowed
      allowNull: true,
      defaultValue: 0, // Default credit days to 0
      comment: "Number of days the customer has credit"
    },
    customerStatus: {
      type: DataTypes.ENUM('active', 'inactive', 'closed'), // Customer's overall status
      allowNull: false,
      defaultValue: 'active', // Default status to 'active'
      comment: "Status of the customer account"
    },
    allotmentId: {
      type: DataTypes.STRING(255), // ID referencing an external allotment plan
      allowNull: true,
      comment: "Reference to allotment plan (if applicable)"
      // Uncomment the following block when `allot_market_plans` is defined
      /*
      references: {
        model: 'allot_market_plans', // Ensure this model exists and is correctly defined
        key: 'allotmentId'
      }
      */
    }
  }, {
    sequelize,
    tableName: 'master_customers', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [{ name: "customerId" }]
      },
      {
        name: "unique_customerCode", // Index on customerCode for uniqueness
        unique: true,
        using: "BTREE",
        fields: [{ name: "customerCode" }]
      }
      // Uncomment the following block if you want to index allotmentId
      /*
      {
        name: "allotmentId",
        using: "BTREE",
        fields: [{ name: "allotmentId" }]
      }
      */
    ]
  });
};
