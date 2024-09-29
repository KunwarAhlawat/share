const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Import models
const MasterCustomerModel = require('./MasterCustomers')(sequelize, DataTypes);
const MasterCategoriesModel = require('./MasterCategories')(sequelize, DataTypes);
const MasterProductsModel = require('./MasterProducts')(sequelize, DataTypes);
const MasterProductGroupsModel = require('./MasterProductGroups')(sequelize, DataTypes);
const MasterFirmModel = require('./MasterFirms')(sequelize, DataTypes);
const MasterEmployeeModel = require('./MasterEmployees')(sequelize, DataTypes);
const MasterAreaModel = require('./MasterAreas')(sequelize, DataTypes);
const MasterGradeModel = require('./MasterGrades')(sequelize, DataTypes);
const CustomerCategoryModel = require('./CustomersCategories')(sequelize, DataTypes);
const CustomerFirmModel = require('./CustomersFirms')(sequelize, DataTypes);
const CustomerProductModel = require('./CustomersProducts')(sequelize, DataTypes);
const CustomerContactsModel = require('./CustomersContacts')(sequelize, DataTypes);

const TestModel = require('./Test')(sequelize, DataTypes);

// Define relationships
// Many-to-Many Relationship with Aliases
MasterCustomerModel.belongsToMany(MasterCategoriesModel, {
    through: CustomerCategoryModel,
    foreignKey: 'customerId',
    as: 'categories'  // Alias for categories related to a customer
});

MasterCategoriesModel.belongsToMany(MasterCustomerModel, {
    through: CustomerCategoryModel,
    foreignKey: 'categoryId',
    as: 'customers'  // Alias for customers related to a category
});

// Define Many-to-Many Relationship with Aliases
MasterCustomerModel.belongsToMany(MasterFirmModel, { 
    through: CustomerFirmModel, 
    foreignKey: 'customerId', 
    otherKey: 'firmId', 
    as: 'firms' // Alias for related firms
  });
  
  MasterFirmModel.belongsToMany(MasterCustomerModel, { 
    through: CustomerFirmModel, 
    foreignKey: 'firmId', 
    otherKey: 'customerId', 
    as: 'customers' // Alias for related customers
  });
  

// Many-to-Many Relationship
MasterCustomerModel.belongsToMany(MasterProductsModel, { 
    through: CustomerProductModel, 
    foreignKey: 'customerId',   
    otherKey: 'productId',
    as: 'products'  // Alias for the products associated with a customer
});

MasterProductsModel.belongsToMany(MasterCustomerModel, { 
    through: CustomerProductModel, 
    foreignKey: 'productId',    
    otherKey: 'customerId',
    as: 'customers'  // Alias for the customers associated with a product
});



// One-to-Many Relationship
MasterCustomerModel.hasMany(CustomerContactsModel, {
    foreignKey: 'customerId',
    as: 'contacts'  // Alias for the contacts associated with a customer
});

CustomerContactsModel.belongsTo(MasterCustomerModel, {
    foreignKey: 'customerId',
    as: 'customer'  // Alias for the customer associated with the contact
});


// One-to-Many Relationship
MasterAreaModel.hasMany(MasterCustomerModel, {
    foreignKey: 'areaId',
    as: 'customers' 
});
MasterCustomerModel.belongsTo(MasterAreaModel, {
    foreignKey: 'areaId',
    as: 'area'
});

// One-to-Many Relationship
MasterGradeModel.hasMany(MasterCustomerModel, {
    foreignKey: 'gradeId',
    as:'customers'
});
MasterCustomerModel.belongsTo(MasterGradeModel, {
    foreignKey: 'gradeId',
    as:'grade'
});


// One-to-Many Relationship
MasterProductGroupsModel.hasMany(MasterProductsModel, {
    foreignKey: 'productGroupId',
    as:'products'
});
MasterProductsModel.belongsTo(MasterProductGroupsModel, {
    foreignKey: 'productGroupId',
    as:'productGroups'
});
module.exports = {
    sequelize,
    MasterCustomerModel,
    MasterCategoriesModel,
    MasterProductsModel,
    MasterFirmModel,
    MasterEmployeeModel,
    MasterAreaModel,
    MasterGradeModel,
    CustomerContactsModel,
    CustomerCategoryModel,
    CustomerFirmModel,
    CustomerProductModel,
    MasterProductGroupsModel,
    TestModel
  };
