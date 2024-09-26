const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "test",
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Full name of the employee",
        validate: {
          notEmpty: {
            msg: "Employee name cannot be empty.",
          },
          is: {
            args: /^[a-zA-Z\s]*$/,
            msg: "Employee name can only contain letters and spaces.",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "test",
      timestamps: true,
      indexes: [
        {
          name: "name",
          using: "BTREE",
          fields: [{ name: "name" }],
        },
      ],
    }
  );
};
