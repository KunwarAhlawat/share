const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_areas', {
    areaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    areaName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Unique name for the area",
      validate: {
        notEmpty: {
          msg: "Area name cannot be empty."
        },
        len: {
          args: [1, 50],
          msg: "Area name must be between 1 and 50 characters long."
        },
        is: {
          args: /^[a-zA-Z0-9\s]+$/i,
          msg: "Area name must contain only letters, numbers, and spaces."
        }
      }
    },
    districtName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      comment: "District this area belongs to",
      validate: {
        len: {
          args: [0, 50],
          msg: "District name must be less than or equal to 50 characters long."
        },
        is: {
          args: /^[a-zA-Z\s]+$/i,
          msg: "District name must contain only letters and spaces."
        }
      }
    },
    zoneName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Zone for the area",
      defaultValue: null,
      validate: {
        len: {
          args: [0, 50],
          msg: "Zone name must be less than or equal to 50 characters long."
        },
        is: {
          args: /^[a-zA-Z\s]+$/i,
          msg: "Zone name must contain only letters and spaces."
        }
      }
    },
    stateName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "State under which the area falls",
      defaultValue: null,
      validate: {
        len: {
          args: [0, 50],
          msg: "State name must be less than or equal to 50 characters long."
        },
        is: {
          args: /^[a-zA-Z\s]+$/i,
          msg: "State name must contain only letters and spaces."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_areas',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "areaId" }]
      }
    ]
  });
};
