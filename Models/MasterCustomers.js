const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_customers', {
    customerId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the customer",
      validate: {
        notEmpty: {
          msg: "Customer ID cannot be empty."
        },
        len: {
          args: [1, 255],
          msg: "Customer ID must be between 1 and 255 characters long."
        },
        isAlphanumeric: {
          msg: "Customer ID must contain only letters and numbers."
        }
      }
    },
    customerCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Unique code representing the customer",
      validate: {
        notEmpty: {
          msg: "Customer code cannot be empty."
        },
        len: {
          args: [1, 255],
          msg: "Customer code must be between 1 and 255 characters long."
        },
        isAlphanumeric: {
          msg: "Customer code must contain only letters and numbers."
        }
      }
    },
    customerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Customer's full name",
      validate: {
        notEmpty: {
          msg: "Customer name cannot be empty."
        },
        len: {
          args: [1, 255],
          msg: "Customer name must be between 1 and 255 characters long."
        },
        is: {
          args: /^[a-zA-Z\s]+$/,
          msg: "Customer name can only contain letters and spaces."
        }
      }
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Customer's area (referenced from master_areas)",
      references: {
        model: 'master_areas',
        key: 'areaId'
      },
      validate: {
        isInt: {
          msg: "Area ID must be an integer."
        }
      }
    },
    status: {
      type: DataTypes.ENUM('VERIFIED', 'UNVERIFIED'),
      allowNull: false,
      defaultValue: 'UNVERIFIED',
      comment: "Verification status of the customer"
    },
    gradeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Customer grade or classification",
      references: {
        model: 'master_grades',
        key: 'gradeId'
      },
      validate: {
        isInt: {
          msg: "Grade ID must be an integer."
        }
      }
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Area postal code",
      validate: {
        isNumeric: {
          msg: "Pincode must contain only numbers."
        },
        len: {
          args: [5, 6],
          msg: "Pincode must be 5 or 6 digits long."
        }
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Customer's complete address",
      validate: {
        len: {
          args: [0, 255],
          msg: "Address must be less than or equal to 255 characters long."
        }
      }
    },
    referenceName1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "First reference person for the customer",
      validate: {
        len: {
          args: [0, 255],
          msg: "Reference name must be less than or equal to 255 characters long."
        }
      }
    },
    reference1ContactNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Contact number of the first reference",
      validate: {
        isNumeric: {
          msg: "Contact number must contain only numbers."
        },
        len: {
          args: [10, 15],
          msg: "Contact number must be between 10 and 15 digits long."
        }
      }
    },
    referenceName2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Second reference person for the customer",
      validate: {
        len: {
          args: [0, 255],
          msg: "Reference name must be less than or equal to 255 characters long."
        }
      }
    },
    reference2ContactNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Contact number of the second reference",
      validate: {
        isNumeric: {
          msg: "Contact number must contain only numbers."
        },
        len: {
          args: [10, 15],
          msg: "Contact number must be between 10 and 15 digits long."
        }
      }
    },
    creditLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Credit limit for the customer",
      validate: {
        isInt: {
          msg: "Credit limit must be an integer."
        },
        min: {
          args: [0],
          msg: "Credit limit cannot be negative."
        }
      }
    },
    creditDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Number of days the customer has credit",
      validate: {
        isInt: {
          msg: "Credit days must be an integer."
        },
        min: {
          args: [0],
          msg: "Credit days cannot be negative."
        }
      }
    },
    customerStatus: {
      type: DataTypes.ENUM('active', 'inactive', 'closed'),
      allowNull: false,
      defaultValue: 'active',
      comment: "Status of the customer account"
    },
    allotmentId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Reference to allotment plan (if applicable)"
    }
  }, {
    sequelize,
    tableName: 'master_customers',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "customerId" }]
      },
    ]
  });
};
