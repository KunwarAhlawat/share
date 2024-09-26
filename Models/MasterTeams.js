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
      comment: "Name or identifier of the team member",
      validate: {
        notEmpty: {
          msg: "Team member cannot be empty."
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Team member can only contain letters and spaces."
        }
      }
    },
    teamLeader: {
      type: DataTypes.STRING(255), // Name or identifier of the team leader
      allowNull: true, // Allow null if team leader is not assigned
      comment: "Name or identifier of the team leader",
      validate: {
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Team leader can only contain letters and spaces."
        }
      }
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
     
    ]
  });
};
