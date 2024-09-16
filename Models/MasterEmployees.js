const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_employees', {
    empId: {
      type: DataTypes.STRING(225), // Employee unique identifier
      allowNull: false, // Primary key should not be null
      primaryKey: true,
      comment: "Unique identifier for the employee"
    },
    employeeName: {
      type: DataTypes.STRING(255), // Full name of the employee
      allowNull: true,
      comment: "Full name of the employee"
    },
    designation: {
      type: DataTypes.STRING(255), // Job title or role
      allowNull: true,
      comment: "Employee's job title or role"
    },
    dateOfJoining: {
      type: DataTypes.DATEONLY, // Only the date, no time component
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Date when the employee joined"
    },
    dateOfLeaving: {
      type: DataTypes.DATEONLY, // Only the date, no time component
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Date when the employee left (if applicable)"
    },
    gender: {
      type: DataTypes.STRING(255), // Gender of the employee
      allowNull: true,
      comment: "Gender of the employee"
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY, // Only the date, no time component
      allowNull: true,
      comment: "Date of birth of the employee"
    },
    bloodGroup: {
      type: DataTypes.STRING(255), // Blood group of the employee
      allowNull: true,
      comment: "Blood group of the employee"
    },
    address: {
      type: DataTypes.STRING(255), // Residential address
      allowNull: true,
      comment: "Residential address of the employee"
    },
    primaryMobileNumber: {
      type: DataTypes.STRING(50), // Primary contact number
      allowNull: true,
      comment: "Primary mobile number of the employee"
    },
    fatherName: {
      type: DataTypes.STRING(255), // Father's name
      allowNull: true,
      comment: "Father's name of the employee"
    },
    motherName: {
      type: DataTypes.STRING(255), // Mother's name
      allowNull: true,
      comment: "Mother's name of the employee"
    },
    fatherMobileNumber: {
      type: DataTypes.STRING(50), // Father's contact number
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Father's mobile number"
    },
    motherMobileNumber: {
      type: DataTypes.STRING(50), // Mother's contact number
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Mother's mobile number"
    },
    spouseName: {
      type: DataTypes.STRING(255), // Spouse's name
      allowNull: true,
      comment: "Spouse's name (if applicable)"
    },
    spouseMobileNumber: {
      type: DataTypes.STRING(50), // Spouse's contact number
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "Spouse's mobile number (if applicable)"
    },
    emailId: {
      type: DataTypes.STRING(255), // Email address
      allowNull: true,
      unique: true, // Ensure emailId is unique
      comment: "Unique email address of the employee"
    },
    bankName: {
      type: DataTypes.STRING(255), // Bank name for salary
      allowNull: true,
      comment: "Bank name where the salary is deposited"
    },
    bankAccountNumber: {
      type: DataTypes.STRING(50), // Bank account number
      allowNull: true,
      unique: true, // Ensure bankAccountNumber is unique
      defaultValue: null, // Use null for unset values
      comment: "Bank account number"
    },
    ifscCode: {
      type: DataTypes.STRING(50), // IFSC code for bank transactions
      allowNull: true,
      defaultValue: null, // Use null for unset values
      comment: "IFSC code of the bank"
    },
    aadharNumber: {
      type: DataTypes.STRING(50), // Aadhar number (for Indian employees)
      allowNull: true,
      unique: true, // Ensure aadharNumber is unique
      defaultValue: null, // Use null for unset values
      comment: "Aadhar number (if applicable)"
    },
    panNumber: {
      type: DataTypes.STRING(50), // PAN number (for Indian employees)
      allowNull: true,
      unique: true, // Ensure panNumber is unique
      defaultValue: null, // Use null for unset values
      comment: "PAN number (if applicable)"
    },
    reference: {
      type: DataTypes.STRING(255), // Reference details (if applicable)
      allowNull: true,
      comment: "Reference details for the employee"
    },
    referenceContactNumber: {
      type: DataTypes.STRING(50), // Contact number of the reference
      allowNull: true,
      comment: "Contact number of the reference person"
    },
    photo: {
      type: DataTypes.STRING(255), // URL or path to employee's photo
      allowNull: true,
      comment: "URL or path to the employee's photo"
    },
    password: {
      type: DataTypes.STRING(255), // Password for employee login (hashed)
      allowNull: true,
      comment: "Hashed password for employee login"
    },
    resume: {
      type: DataTypes.STRING(255), // URL or path to employee's resume
      allowNull: true,
      comment: "URL or path to the employee's resume"
    }
  }, {
    sequelize,
    tableName: 'master_employees', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [{ name: "empId" }]
      },
      {
        name: "emailId", // Index to ensure unique emailId
        unique: true,
        using: "BTREE",
        fields: [{ name: "emailId" }]
      },
      {
        name: "aadharNumber", // Index to ensure unique aadharNumber
        unique: true,
        using: "BTREE",
        fields: [{ name: "aadharNumber" }]
      },
      {
        name: "panNumber", // Index to ensure unique panNumber
        unique: true,
        using: "BTREE",
        fields: [{ name: "panNumber" }]
      },
      {
        name: "bankAccountNumber", // Index to ensure unique bankAccountNumber
        unique: true,
        using: "BTREE",
        fields: [{ name: "bankAccountNumber" }]
      }
    ]
  });
};
