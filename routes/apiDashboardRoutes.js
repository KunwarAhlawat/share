// const express = require('express');
// const router = express.Router();
// const dashboardController = require('../controllers/dashboardController');
// const customersController = require('../controllers/customersController');

// // Import the CrudController
// const CrudController = require('../controllers/crudController ');

// // test controller

// const masterFirmsController = require('../controllers/firmsController');

// // Import all models related to apiDashboard
// const {   sequelize,
//     customerCategoryModel,
//     customerContactModel,
//     customerFirmModel,
//     customerProductModel,
//     masterAreaModel,
//     masterCategoriesModel,
//     masterCustomerModel,
//     masterEmployeeModel,
//     // masterFirmModel,
//     masterGradeModel,
//     masterProductGroupModel,
//     masterProductsModel,
//     masterTeamsModel,
//     masterVendorsModel} = require('../models/index');





// // Create an instance of CrudController for the all the above models
// // const masterFirmController = new CrudController(masterFirmModel);
// const masterCategoriesController = new CrudController(masterCategoriesModel);
// const masterCustomerController = new CrudController(masterCustomerModel);
// const masterEmployeeController = new CrudController(masterEmployeeModel);
// const masterGradeController = new CrudController(masterGradeModel);
// const masterProductGroupController = new CrudController(masterProductGroupModel);
// const masterProductsController = new CrudController(masterProductsModel);
// const masterTeamsController = new CrudController(masterTeamsModel);
// const masterVendorsController = new CrudController(masterVendorsModel);
// const masterAreaController = new CrudController(masterAreaModel);

// const customerCategoryController = new CrudController(customerCategoryModel);
// const customerContactController = new CrudController(customerContactModel);
// const customerFirmController = new CrudController(customerFirmModel);
// const customerProductController = new CrudController(customerProductModel);

// router.get('/apiDashboard',dashboardController.dashboard );
// router.get('/apiDashboard/customers',customersController.customers );

// // Routes related to master firms models
// router.post('/apiDashboard/firm-create', masterFirmsController.create);         // Route to create a new record
// router.get('/apiDashboard/firm-list', masterFirmsController.findAll);         // Route to get all records
// router.get('/apiDashboard/firm/:id', masterFirmsController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/firm/:id', masterFirmsController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/firm/:id', masterFirmsController.delete);    // Route to delete a record by ID

// // Routes related to master categories models
// router.post('/apiDashboard/categories-create', masterCategoriesController.create);         // Route to create a new record
// router.get('/apiDashboard/categories-list', masterCategoriesController.findAll);         // Route to get all records
// router.get('/apiDashboard/categories/:id', masterCategoriesController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/categories/:id', masterCategoriesController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/categories/:id', masterCategoriesController.delete);    // Route to delete a record by ID

// // Routes related to master customer models
// router.post('/apiDashboard/customer-create', masterCustomerController.create);         // Route to create a new record
// router.get('/apiDashboard/customer-list', masterCustomerController.findAll);         // Route to get all records
// router.get('/apiDashboard/customer/:id', masterCustomerController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/customer/:id', masterCustomerController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/customer/:id', masterCustomerController.delete);    // Route to delete a record by ID

// // Routes related to master employee models
// router.post('/apiDashboard/employee-create', masterEmployeeController.create);         // Route to create a new record
// router.get('/apiDashboard/employee-list', masterEmployeeController.findAll);         // Route to get all records
// router.get('/apiDashboard/employee/:id', masterEmployeeController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/employee/:id', masterEmployeeController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/employee/:id', masterEmployeeController.delete);    // Route to delete a record by ID

// // Routes related to master grade models
// router.post('/apiDashboard/grade-create', masterGradeController.create);         // Route to create a new record
// router.get('/apiDashboard/grade-list', masterGradeController.findAll);         // Route to get all records
// router.get('/apiDashboard/grade/:id', masterGradeController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/grade/:id', masterGradeController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/grade/:id', masterGradeController.delete);    // Route to delete a record by ID

// // Routes related to master Product Group models
// router.post('/apiDashboard/product-group-create', masterProductGroupController.create);         // Route to create a new record
// router.get('/apiDashboard/product-group-list', masterProductGroupController.findAll);         // Route to get all records
// router.get('/apiDashboard/product-group/:id', masterProductGroupController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/product-group/:id', masterProductGroupController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/product-group/:id', masterProductGroupController.delete);    // Route to delete a record by ID

// // Routes related to master product models
// router.post('/apiDashboard/product-create', masterProductsController.create);         // Route to create a new record
// router.get('/apiDashboard/product-list', masterProductsController.findAll);         // Route to get all records
// router.get('/apiDashboard/product/:id', masterProductsController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/product/:id', masterProductsController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/product/:id', masterProductsController.delete);    // Route to delete a record by ID

// // Routes related to master team models
// router.post('/apiDashboard/team-create', masterTeamsController.create);         // Route to create a new record
// router.get('/apiDashboard/team-list', masterTeamsController.findAll);         // Route to get all records
// router.get('/apiDashboard/team/:id', masterTeamsController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/team/:id', masterTeamsController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/team/:id', masterTeamsController.delete);    // Route to delete a record by ID

// // Routes related to master vendors models
// router.post('/apiDashboard/vendor-create', masterVendorsController.create);         // Route to create a new record
// router.get('/apiDashboard/vendor-list', masterVendorsController.findAll);         // Route to get all records
// router.get('/apiDashboard/vendor/:id', masterVendorsController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/vendor/:id', masterVendorsController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/vendor/:id', masterVendorsController.delete);    // Route to delete a record by ID

// // Routes related to master area models
// router.post('/apiDashboard/area-create', masterAreaController.create);         // Route to create a new record
// router.get('/apiDashboard/area-list', masterAreaController.findAll);         // Route to get all records
// router.get('/apiDashboard/area/:id', masterAreaController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/area/:id', masterAreaController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/area/:id', masterAreaController.delete);    // Route to delete a record by ID

// // Routes related to customer category models
// router.post('/apiDashboard/customer-category-create', customerCategoryController.create);         // Route to create a new record
// router.get('/apiDashboard/customer-category-list', customerCategoryController.findAll);         // Route to get all records
// router.get('/apiDashboard/customer-category/:id', customerCategoryController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/customer-category/:id', customerCategoryController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/customer-category/:id', customerCategoryController.delete);    // Route to delete a record by ID

// // Routes related to customer contact models
// router.post('/apiDashboard/customer-contact-create', customerContactController.create);         // Route to create a new record
// router.get('/apiDashboard/customer-contact-list', customerContactController.findAll);         // Route to get all records
// router.get('/apiDashboard/customer-contact/:id', customerContactController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/customer-contact/:id', customerContactController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/customer-contact/:id', customerContactController.delete);    // Route to delete a record by ID

// // Routes related to customer firm models
// router.post('/apiDashboard/customer-firm-create', customerFirmController.create);         // Route to create a new record
// router.get('/apiDashboard/customer-firm-list', customerFirmController.findAll);         // Route to get all records
// router.get('/apiDashboard/customer-firm/:id', customerFirmController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/customer-firm/:id', customerFirmController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/customer-firm/:id', customerFirmController.delete);    // Route to delete a record by ID

// // Routes related to customer product models
// router.post('/apiDashboard/customer-product-create', customerProductController.create);         // Route to create a new record
// router.get('/apiDashboard/customer-product-list', customerProductController.findAll);         // Route to get all records
// router.get('/apiDashboard/customer-product/:id', customerProductController.findOne);      // Route to get a single record by ID
// router.put('/apiDashboard/customer-product/:id', customerProductController.update);       // Route to update a record by ID
// router.delete('/apiDashboard/customer-product/:id', customerProductController.delete);    // Route to delete a record by ID




// //Routes related to all customer data
// // router.post('/apiDashboard/all-customer-product-create', customersController.create);         // Route to create a new record
// router.get('/apiDashboard/all-customer-product-list', customersController.customerList);         // Route to get all records
// router.get('/apiDashboard/all-customer-product/:id', customersController.findOneCustomer);      // Route to get a single record by ID
// // router.put('/apiDashboard/all-customer-product/:id', customersController.update);       // Route to update a record by ID
// // router.delete('/apiDashboard/all-customer-product/:id', customersController.delete);    // Route to delete a record by ID


// module.exports = router;
