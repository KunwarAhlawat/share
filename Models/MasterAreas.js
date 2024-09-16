const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_areas', {
    areaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Auto-incrementing primary key
      allowNull: false,
      primaryKey: true
    },
    areaName: {
      type: DataTypes.STRING(50), // Name of the area
      allowNull: false,
      unique: true, // Must be unique
      comment: "Unique name for the area"
    },
    districtName: {
      type: DataTypes.STRING(50), // Name of the district
      allowNull: true,
      comment: "District this area belongs to"
    },
    zoneName: {
      type: DataTypes.STRING(50), // Zone information (optional)
      allowNull: true,
      comment: "Zone for the area"
    },
    stateName: {
      type: DataTypes.STRING(50), // State information (optional)
      allowNull: true,
      comment: "State under which the area falls"
    }
  }, {
    sequelize,
    tableName: 'master_areas', // Table name
    timestamps: true, // Adds createdAt/updatedAt
    indexes: [
      {
        name: "PRIMARY", // Index on areaId (primary key)
        unique: true,
        using: "BTREE",
        fields: [{ name: "areaId" }]
      },
      {
        name: "unique_area_name", // Unique index on areaName
        unique: true,
        using: "BTREE",
        fields: [{ name: "areaName" }]
      }
    ]
  });
};
