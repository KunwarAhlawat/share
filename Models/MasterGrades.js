const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_grades', {
    gradeId: {
      type: DataTypes.INTEGER, // Unique identifier for the grade
      autoIncrement: true, // Auto-increment for primary key
      allowNull: false, // Grade ID should not be null
      primaryKey: true, // Designates gradeId as the primary key
      comment: "Unique identifier for the grade"
    },
    gradeType: {
      type: DataTypes.STRING(255), // Type or category of the grade
      allowNull: false, // Grade Type should not be null
      comment: "Type or category of the grade",
      validate: {
        notEmpty: {
          msg: "Grade type cannot be empty."
        },
        is: {
          args: /^[a-zA-Z\s]*$/, // Allow only alphabets and spaces
          msg: "Grade type can only contain letters and spaces."
        },
        len: {
          args: [1, 255], // Ensures gradeType is between 3 and 255 characters
          msg: "Grade type should be between 3 and 255 characters."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_grades', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [
          { name: "gradeId" }
        ]
      }
    ]
  });
};
