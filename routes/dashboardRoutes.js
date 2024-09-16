const express = require('express');
const router = express.Router();

// Multer configuration for file uploads
const upload = require('../config/multerConfig');


const dashboardController = require('../controllers/dashboardController');
const customersController = require('../controllers/customersController');
const firmsController = require('../controllers/firmsController');
const areasController = require('../controllers/areasController');
const categoriesController = require('../controllers/categoriesController');
const gradesController = require('../controllers/gradesController');
const productsController = require('../controllers/productsController');
const productGroupsController = require('../controllers/productGroupsController');
const employeesController = require('../controllers/employeesController');

// Auth Controllers
// const authController = require('../controllers/authController');

// router.get('/dashboard/',dashboardController.dashboard );
// router.get('/dashboard/login',authController.showLoginForm  );
// router.post('/dashboard/login',authController.login  );
// router.get('/dashboard/register',authController.register );


// router.get('/dashboard/customers',customersController.customers );

// customers routes

router.get('/dashboard/customers', customersController.getAllCustomers);
router.get('/api/dashboard/customers', customersController.getAllCustomersApi);
router.post('/api/dashboard/customer/create', customersController.apiCreateCustomer);
// router.post('/dashboard/customer/create', upload.single('photo'), customersController.createCustomer);
// router.post('/dashboard/customer/edit/:id', upload.single('photo'),customersController.updateCustomer);
// router.delete('/dashboard/customer/delete/:id', customersController.deleteCustomer);

// employees routes
router.get('/dashboard/employees', employeesController.getAllEmployees);
router.post('/dashboard/employees/create', upload.single('photo'), employeesController.createEmployee);
router.post('/dashboard/employees/edit/:id', upload.single('photo'),employeesController.updateEmployee);
router.delete('/dashboard/employees/delete/:id', employeesController.deleteEmployee);

// area routes
router.get('/dashboard/areas',areasController.getAllArea );
router.post('/dashboard/area/create', areasController.createArea);
router.post('/dashboard/area/update/edit/:id', areasController.updateArea);
router.delete('/dashboard/area/delete/:id', areasController.deleteArea);

// firm routes
router.get('/dashboard/firms',firmsController.getAllFirm );
router.post('/dashboard/firm/create', firmsController.createFirm);
router.post('/dashboard/firm/update/edit/:id', firmsController.updateFirm);
router.delete('/dashboard/firm/delete/:id', firmsController.deleteFirm);

// category routes
router.get('/dashboard/categories',categoriesController.getAllCategory );
// router.post('/dashboard/category/create', categoriesController.createCategory);
// router.post('/dashboard/category/update/edit/:id', categoriesController.updateCategory);
// router.delete('/dashboard/category/delete/:id', categoriesController.deleteCategory);



// router.get('/dashboard/firms',firmsController.firms );

// router.get('/dashboard/categories',categoriesController.categories );
// router.get('/dashboard/grades',gradesController.grades );
// router.get('/dashboard/products',productsController.products);
// router.get('/dashboard/product-groups',productGroupsController.productGroups );
// router.get('/dashboard/teams',areasController.areas );
module.exports = router;
