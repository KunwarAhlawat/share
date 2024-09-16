const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_grades', {
    gradeId: {
      type: DataTypes.INTEGER, // Unique identifier for the grade
      autoIncrement: true, // Auto-increment for primary key
      allowNull: false, // Grade ID should not be null
      primaryKey: true,
      comment: "Unique identifier for the grade"
    },
    gradeType: {
      type: DataTypes.STRING(255), // Type of the grade
      allowNull: true,
      comment: "Type or category of the grade"
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
