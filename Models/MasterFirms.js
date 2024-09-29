const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_firms', {
    firmId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the firm",
      validate: {
        notEmpty: {
          msg: "Firm ID cannot be empty."
        },
        isAlphanumeric: {
          msg: "Firm ID must be alphanumeric."
        }
      }
    },
    firmName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Name of the firm",
      validate: {
        notEmpty: {
          msg: "Firm name cannot be empty."
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Firm name can only contain letters and spaces."
        }
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Address of the firm",
      defaultValue: null,
      validate: {
        len: {
          args: [5, 255],
          msg: "Address should be between 5 and 255 characters."
        }
      }
    },
    pincode: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: null,
      comment: "Postal code of the firm's address",
      validate: {
        isNumeric: {
          msg: "Pincode must contain only numbers."
        },
        len: {
          args: [6, 6],
          msg: "Pincode must be exactly 6 digits."
        }
      }
    },
    GSTNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "GST number of the firm",
      validate: {
        is: {
          args: /^[a-zA-Z0-9]+$/,
          msg: "GST number must be in a valid format."
        },
        notEmpty: {
          msg: "GST number cannot be empty."
        }
      }
    },
    accountNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "Bank account number of the firm",
      validate: {
        isNumeric: {
          msg: "Account number must contain only numbers."
        },
        len: {
          args: [10, 18],
          msg: "Account number must be between 10 and 18 digits."
        }
      }
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Name of the bank where the firm holds an account",
      defaultValue: null,
      validate: {
        len: {
          args: [3, 255],
          msg: "Bank name must be between 3 and 255 characters."
        }
      }
    },
    IFSCcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "IFSC code of the firm's bank",
      validate: {
        isAlphanumeric: {
          msg: "IFSC code must be alphanumeric."
        },
      }
    },
    productProduced: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Products produced by the firm",
      validate: {
        len: {
          args: [3, 255],
          msg: "Product description should be between 3 and 255 characters."
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: "Quantity of products produced or handled by the firm",
      validate: {
        isInt: {
          msg: "Quantity must be a whole number."
        },
        min: {
          args: [1],
          msg: "Quantity must be at least 1."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_firms',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "firmId" }]
      },
    ]
  });
};
