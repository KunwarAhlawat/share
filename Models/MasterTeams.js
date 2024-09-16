const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_teams', {
    teamId: {
      autoIncrement: true, // Automatically increment this field
      type: DataTypes.INTEGER, // Integer type for team ID
      allowNull: false, // Ensure team ID is not null
      primaryKey: true, // Primary key for the team
      comment: "Unique identifier for the team"
    },
    teamMember: {
      type: DataTypes.STRING(255), // Name or identifier of the team member
      allowNull: false, // Ensure team member field is not null
      unique: true, // Ensure uniqueness of the team member
      comment: "Name or identifier of the team member"
    },
    teamLeader: {
      type: DataTypes.STRING(255), // Name or identifier of the team leader
      allowNull: true, // Allow null if team leader is not assigned
      comment: "Name or identifier of the team leader"
    }
  }, {
    sequelize,
    tableName: 'master_teams', // Database table name
    timestamps: true, // Add timestamps (createdAt and updatedAt)
    indexes: [
      {
        name: "PRIMARY", // Index on the primary key
        unique: true,
        using: "BTREE",
        fields: [
          { name: "teamId" }
        ]
      },
      {
        name: "unique_teamMember", // Index to enforce uniqueness of teamMember
        unique: true,
        using: "BTREE",
        fields: [
          { name: "teamMember" }
        ]
      }
    ]
  });
};
