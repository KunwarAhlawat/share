const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_employees', {
    empId: {
      type: DataTypes.STRING(225),
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the employee",
      validate: {
        notEmpty: { msg: "Employee ID cannot be empty." },
        isAlphanumeric: { msg: "Employee ID must be alphanumeric." }
      }
    },
    employeeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Full name of the employee",
      validate: {
        notEmpty: { msg: "Employee name cannot be empty." },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "Employee name can only contain letters and spaces."
        }
      }
    },
    designation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Employee's job title or role",
      validate: { notEmpty: { msg: "Designation cannot be empty." } }
    },
    dateOfJoining: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Date when the employee joined",
      validate: {
        notEmpty: { msg: "Date of joining cannot be empty." },
        isDate: { msg: "Date of joining must be a valid date." }
      }
    },
    dateOfLeaving: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: "Date when the employee left (if applicable)",
      validate: { isDate: { msg: "Date of leaving must be a valid date." } }
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Gender of the employee",
      validate: {
        notEmpty: { msg: "Gender cannot be empty." },
        isIn: {
          args: [['Male', 'Female', 'Other']],
          msg: "Gender must be one of 'Male', 'Female', or 'Other'."
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Date of birth of the employee",
      validate: { isDate: { msg: "Date of birth must be a valid date." } }
    },
    bloodGroup: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Blood group of the employee",
      validate: {
        isIn: {
          args: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']],
          msg: "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', or 'Unknown'."
        }
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Residential address of the employee"
    },
    primaryMobileNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Primary mobile number of the employee",
      validate: {
        notEmpty: { msg: "Primary mobile number cannot be empty." },
        is: {
          args: /^[0-9]{10}$/,
          msg: "Primary mobile number must be a 10-digit number."
        }
      }
    },
    fatherName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Father's name of the employee"
    },
    motherName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Mother's name of the employee"
    },
    fatherMobileNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Father's mobile number",
      validate: {
        is: {
          args: /^[0-9]{10}$/,
          msg: "Father's mobile number must be a 10-digit number."
        }
      }
    },
    motherMobileNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Mother's mobile number",
      validate: {
        is: {
          args: /^[0-9]{10}$/,
          msg: "Mother's mobile number must be a 10-digit number."
        }
      }
    },
    spouseName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Spouse's name (if applicable)"
    },
    spouseMobileNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Spouse's mobile number (if applicable)",
      validate: {
        is: {
          args: /^[0-9]{10}$/,
          msg: "Spouse's mobile number must be a 10-digit number."
        }
      }
    },
    emailId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Unique email address of the employee",
      validate: {
        notEmpty: { msg: "Email ID cannot be empty." },
        isEmail: { msg: "Email ID must be a valid email format." }
      }
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Bank name where the salary is deposited"
    },
    bankAccountNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Bank account number",
      validate: {
        isNumeric: { msg: "Bank account number must contain only numbers." }
      }
    },
    ifscCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "IFSC code of the bank",
      validate: {
        isAlphanumeric: { msg: "IFSC code must be alphanumeric." }
      }
    },
    aadharNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Aadhar number (if applicable)",
      validate: {
        isNumeric: { msg: "Aadhar number must contain only numbers." },
        len: {
          args: [12, 12],
          msg: "Aadhar number must be exactly 12 digits."
        }
      }
    },
    panNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "PAN number (if applicable)",
      validate: {
        is: {
          args: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
          msg: "PAN number must be in the format 'ABCDE1234F'."
        }
      }
    },
    reference: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Reference details for the employee"
    },
    referenceContactNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Contact number of the reference person",
      validate: {
        is: {
          args: /^[0-9]{10}$/,
          msg: "Reference contact number must be a 10-digit number."
        }
      }
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL or path to the employee's photo"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Hashed password for employee login",
      validate: {
        notEmpty: { msg: "Password cannot be empty." },
        len: {
          args: [8, 255],
          msg: "Password must be at least 8 characters long."
        }
      }
    },
    resume: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL or path to the employee's resume"
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User', 'Moderator'),
      allowNull: false,
      comment: "Role of the employee",
      validate: {
        notEmpty: { msg: "Role cannot be empty." },
        isIn: {
          args: [['Admin', 'User', 'Moderator']],
          msg: "Role must be one of 'Admin', 'User', or 'Moderator'."
        }
      }
    }
  }, {
    sequelize,
    tableName: 'master_employees',
    timestamps: true,
    indexes: [
      { name: "PRIMARY", unique: true, using: "BTREE", fields: [{ name: "empId" }] },
    ]
  });
};
