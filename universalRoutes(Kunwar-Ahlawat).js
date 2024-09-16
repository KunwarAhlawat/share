// Import Express
const express = require('express');
const router = express.Router();

// Import the universal CrudController and the specific model
const CrudController = require('../controller/universalController(Kunwar-Ahlawat)');

const profileController = require('../controller/profileController(Kunwar-Ahlawat)');

// Import all master models
const masterFirmModel = require('../model/masterFirmModel');
const masterCategoriesModel = require('../model/masterCategoriesModel');
const masterCustomerModel = require('../model/masterCustomerModel');
const masterEmployeeModel = require('../model/masterEmployeeModel');
const masterGradeModel = require('../model/masterGradeModel');
const masterProductGroupModel = require('../model/masterProductGroupModel');
const masterProductsModel = require('../model/masterProductsModel');
const masterTeamsModel = require('../model/masterTeamsModel');
const masterVendorsModel = require('../model/masterVendorsModel');
const masterAreaModel = require('../model/masterAreaModel');

// Import All cusotmer related models
const customerCategoryModel = require('../model/customerCategoryModel');
const customerContactModel = require('../model/customerContactModel');
const customerFirmModel = require('../model/customerFirmModel');
const customerProductModel = require('../model/customerProductModel');

// Import user model 
const userModel = require('../model/userModel');

// Create an instance of CrudController for the all the above models
const masterFirmController = new CrudController(masterFirmModel);
const masterCategoriesController = new CrudController(masterCategoriesModel);
const masterCustomerController = new CrudController(masterCustomerModel);
const masterEmployeeController = new CrudController(masterEmployeeModel);
const masterGradeController = new CrudController(masterGradeModel);
const masterProductGroupController = new CrudController(masterProductGroupModel);
const masterProductsController = new CrudController(masterProductsModel);
const masterTeamsController = new CrudController(masterTeamsModel);
const masterVendorsController = new CrudController(masterVendorsModel);
const masterAreaController = new CrudController(masterAreaModel);

const customerCategoryController = new CrudController(customerCategoryModel);
const customerContactController = new CrudController(customerContactModel);
const customerFirmController = new CrudController(customerFirmModel);
const customerProductController = new CrudController(customerProductModel);

const userController = new CrudController(userModel);

// Router related to some pages 
router.get('/profile', profileController.getProfile);  

// Routes related to master firms models
router.post('/firmCreate', masterFirmController.create);         // Route to create a new record
router.get('/firmList', masterFirmController.findAll);         // Route to get all records
router.get('/firm/:id', masterFirmController.findOne);      // Route to get a single record by ID
router.put('/firm/:id', masterFirmController.update);       // Route to update a record by ID
router.delete('/firm/:id', masterFirmController.delete);    // Route to delete a record by ID

// Routes related to master categories models
router.post('/categoriesCreate', masterCategoriesController.create);         // Route to create a new record
router.get('/categoriesList', masterCategoriesController.findAll);         // Route to get all records
router.get('/categories/:id', masterCategoriesController.findOne);      // Route to get a single record by ID
router.put('/categories/:id', masterCategoriesController.update);       // Route to update a record by ID
router.delete('/categories/:id', masterCategoriesController.delete);    // Route to delete a record by ID

// Routes related to master customer models
router.post('/customerCreate', masterCustomerController.create);         // Route to create a new record
router.get('/customerList', masterCustomerController.findAll);         // Route to get all records
router.get('/customer/:id', masterCustomerController.findOne);      // Route to get a single record by ID
router.put('/customer/:id', masterCustomerController.update);       // Route to update a record by ID
router.delete('/customer/:id', masterCustomerController.delete);    // Route to delete a record by ID

// Routes related to master employee models
router.post('/employeeCreate', masterEmployeeController.create);         // Route to create a new record
router.get('/employeeList', masterEmployeeController.findAll);         // Route to get all records
router.get('/employee/:id', masterEmployeeController.findOne);      // Route to get a single record by ID
router.put('/employee/:id', masterEmployeeController.update);       // Route to update a record by ID
router.delete('/employee/:id', masterEmployeeController.delete);    // Route to delete a record by ID

// Routes related to master grade models
router.post('/gradeCreate', masterGradeController.create);         // Route to create a new record
router.get('/gradeList', masterGradeController.findAll);         // Route to get all records
router.get('/grade/:id', masterGradeController.findOne);      // Route to get a single record by ID
router.put('/grade/:id', masterGradeController.update);       // Route to update a record by ID
router.delete('/grade/:id', masterGradeController.delete);    // Route to delete a record by ID

// Routes related to master Product Group models
router.post('/productGroupCreate', masterProductGroupController.create);         // Route to create a new record
router.get('/productGroupList', masterProductGroupController.findAll);         // Route to get all records
router.get('/productGroup/:id', masterProductGroupController.findOne);      // Route to get a single record by ID
router.put('/productGroup/:id', masterProductGroupController.update);       // Route to update a record by ID
router.delete('/productGroup/:id', masterProductGroupController.delete);    // Route to delete a record by ID

// Routes related to master product models
router.post('/productCreate', masterProductsController.create);         // Route to create a new record
router.get('/productList', masterProductsController.findAll);         // Route to get all records
router.get('/product/:id', masterProductsController.findOne);      // Route to get a single record by ID
router.put('/product/:id', masterProductsController.update);       // Route to update a record by ID
router.delete('/product/:id', masterProductsController.delete);    // Route to delete a record by ID

// Routes related to master team models
router.post('/teamCreate', masterTeamsController.create);         // Route to create a new record
router.get('/teamList', masterTeamsController.findAll);         // Route to get all records
router.get('/team/:id', masterTeamsController.findOne);      // Route to get a single record by ID
router.put('/team/:id', masterTeamsController.update);       // Route to update a record by ID
router.delete('/team/:id', masterTeamsController.delete);    // Route to delete a record by ID

// Routes related to master vendors models
router.post('/vendorCreate', masterVendorsController.create);         // Route to create a new record
router.get('/vendorList', masterVendorsController.findAll);         // Route to get all records
router.get('/vendor/:id', masterVendorsController.findOne);      // Route to get a single record by ID
router.put('/vendor/:id', masterVendorsController.update);       // Route to update a record by ID
router.delete('/vendor/:id', masterVendorsController.delete);    // Route to delete a record by ID

// Routes related to master area models
router.post('/areaCreate', masterAreaController.create);         // Route to create a new record
router.get('/areaList', masterAreaController.findAll);         // Route to get all records
router.get('/area/:id', masterAreaController.findOne);      // Route to get a single record by ID
router.put('/area/:id', masterAreaController.update);       // Route to update a record by ID
router.delete('/area/:id', masterAreaController.delete);    // Route to delete a record by ID

// Routes related to cutomer category models
router.post('/customerCategoryCreate', customerCategoryController.create);         // Route to create a new record
router.get('/customerCategoryList', customerCategoryController.findAll);         // Route to get all records
router.get('/customerCategory/:id', customerCategoryController.findOne);      // Route to get a single record by ID
router.put('/customerCategory/:id', customerCategoryController.update);       // Route to update a record by ID
router.delete('/customerCategory/:id', customerCategoryController.delete);    // Route to delete a record by ID

// Routes related to cutomer contact models
router.post('/customerContactCreate', customerContactController.create);         // Route to create a new record
router.get('/customerContactList', customerContactController.findAll);         // Route to get all records
router.get('/customerContact/:id', customerContactController.findOne);      // Route to get a single record by ID
router.put('/customerContact/:id', customerContactController.update);       // Route to update a record by ID
router.delete('/customerContact/:id', customerContactController.delete);    // Route to delete a record by ID

// Routes related to cutomer firm models
router.post('/customerFirmCreate', customerFirmController.create);         // Route to create a new record
router.get('/customerFirmList', customerFirmController.findAll);         // Route to get all records
router.get('/customerFirm/:id', customerFirmController.findOne);      // Route to get a single record by ID
router.put('/customerFirm/:id', customerFirmController.update);       // Route to update a record by ID
router.delete('/customerFirm/:id', customerFirmController.delete);    // Route to delete a record by ID

// Routes related to cutomer product models
router.post('/customerProductCreate', customerProductController.create);         // Route to create a new record
router.get('/customerProductList', customerProductController.findAll);         // Route to get all records
router.get('/customerProduct/:id', customerProductController.findOne);      // Route to get a single record by ID
router.put('/customerProduct/:id', customerProductController.update);       // Route to update a record by ID
router.delete('/customerProduct/:id', customerProductController.delete);    // Route to delete a record by ID

// Routes related to user models
router.post('/userCreate', userController.create);         // Route to create a new record
router.get('/userList', userController.findAll);         // Route to get all records
router.get('/user/:id', userController.findOne);      // Route to get a single record by ID
router.put('/user/:id', userController.update);       // Route to update a record by ID
router.delete('/user/:id', userController.delete);    // Route to delete a record by ID

// Export the router to use in your main app
module.exports = router;
