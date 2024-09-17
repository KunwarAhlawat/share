// const { Sequelize, DataTypes } = require('sequelize');
// const config = require('../config/config');
// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

// // Initialize Sequelize
// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
// });

// // Import models
// const MasterCustomerModel = require('./MasterCustomers')(sequelize, DataTypes);
// const MasterCategoriesModel = require('./MasterCategories')(sequelize, DataTypes);
// const MasterProductsModel = require('./MasterProducts')(sequelize, DataTypes);
// const MasterFirmModel = require('./MasterFirms')(sequelize, DataTypes);
// const MasterEmployeeModel = require('./MasterEmployees')(sequelize, DataTypes);
// const MasterAreaModel = require('./MasterAreas')(sequelize, DataTypes);
// const MasterGradeModel = require('./MasterGrades')(sequelize, DataTypes);
// const CustomerCategoryModel = require('./CustomersCategories')(sequelize, DataTypes);
// const CustomerFirmModel = require('./CustomersFirms')(sequelize, DataTypes);
// const CustomerProductModel = require('./CustomersProducts')(sequelize, DataTypes);
// const CustomerContactsModel = require('./CustomersContacts')(sequelize, DataTypes);

// // Define relationships
// // Many-to-Many Relationship
// MasterCustomerModel.belongsToMany(MasterCategoriesModel, { through: CustomerCategoryModel, foreignKey: 'customerId' });
// MasterCategoriesModel.belongsToMany(MasterCustomerModel, { through: CustomerCategoryModel, foreignKey: 'categoryId' });

// // Many-to-Many Relationship
// MasterCustomerModel.belongsToMany(MasterFirmModel, { through: CustomerFirmModel, foreignKey: 'customerId', otherKey: 'firmId' });
// MasterFirmModel.belongsToMany(MasterCustomerModel, { through: CustomerFirmModel, foreignKey: 'firmId', otherKey: 'customerId' });

// // Many-to-Many Relationship
// MasterCustomerModel.belongsToMany(MasterProductsModel, { through: CustomerProductModel, foreignKey: 'customerId', otherKey: 'productId' });
// MasterProductsModel.belongsToMany(MasterCustomerModel, { through: CustomerProductModel, foreignKey: 'productId', otherKey: 'customerId' });

// // One-to-Many Relationship
// MasterCustomerModel.hasMany(CustomerContactsModel, {
//     foreignKey: 'customerId',
// });
// CustomerContactsModel.belongsTo(MasterCustomerModel, {
//     foreignKey: 'customerId'
// });

// // One-to-Many Relationship
// MasterAreaModel.hasMany(MasterCustomerModel, {
//     foreignKey: 'areaId',
// });
// MasterCustomerModel.belongsTo(MasterAreaModel, {
//     foreignKey: 'areaId'
// });

// MasterGradeModel.hasMany(MasterCustomerModel, {
//     foreignKey: 'gradeId',
// });
// MasterCustomerModel.belongsTo(MasterGradeModel, {
//     foreignKey: 'gradeId'
// });

// module.exports = {
//     sequelize,
//     MasterCustomerModel,
//     MasterCategoriesModel,
//     MasterProductsModel,
//     MasterFirmModel,
//     MasterEmployeeModel,
//     MasterAreaModel,
//     MasterGradeModel,
//     CustomerContactsModel,
//     CustomerCategoryModel,
//     CustomerFirmModel,
//     CustomerProductModel,
//   };
