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


const testController = require('../controllers/testController');

// All routes related to dashboard

// customer routes----------------------------------------------------------------------------------------------------------
router.get('/dashboard/customers', customersController.getCustomers);

// api
router.get('/api/customers', customersController.getCustomersApi);
router.get('/api/customer/:id', customersController.getOneCustomerApi);
router.post('/api/customer/create',upload.single('file'), customersController.createCustomerApi);
router.put('/api/customer/update/:id',upload.single('file'), customersController.updateCustomerApi);
router.delete('/api/customer/delete/:id', customersController.deleteCustomerApi);

// employees routes-----------------------------------------------------------------------------------------------------
router.get('/dashboard/employees', employeesController.getEmployees);


// api
router.get('/api/employees', employeesController.getEmployeesApi);
router.get('/api/employee/create',employeesController.createEmployee);
router.delete('/api/employee/delete/:id', employeesController.deleteEmployeeApi);

// firms routes--------------------------------------------------------------------------------------------------------
router.get('/dashboard/firms',firmsController.getFirms );

// api
router.get('/api/firms', firmsController.getFirmsApi);
router.get('/api/firm/:id', firmsController.getOneFirmApi);
router.post('/api/firm/create',upload.single('file'), firmsController.createFirmApi);
router.put('/api/firm/update/:id',upload.single('file'), firmsController.updateFirmApi);
router.delete('/api/firm/delete/:id', firmsController.deleteFirmApi);

// products routes--------------------------------------------------------------------------------------------------
router.get('/dashboard/products',productsController.getProducts );

// api
router.get('/api/products', productsController.getProductsApi);
router.get('/api/product/:id', productsController.getOneProductApi);
router.post('/api/product/create',upload.single('file'), productsController.createProductApi);
router.put('/api/product/update/:id',upload.single('file'), productsController.updateProductApi);
router.delete('/api/product/delete/:id', productsController.deleteProductApi);

// area routes----------------------------------------------------------------------------------------------------
router.get('/dashboard/areas',areasController.getAreas);

// api
router.get('/api/areas', areasController.getAreasApi);
router.get('/api/area/:id', areasController.getOneAreaApi);
router.post('/api/area/create',upload.single('file'), areasController.createAreaApi);
router.put('/api/area/update/:id',upload.single('file'), areasController.updateAreaApi);
router.delete('/api/area/delete/:id', areasController.deleteAreaApi);

// grade routes-------------------------------------------------------------------------------------------------
router.get('/dashboard/grades',gradesController.getGrades);

// api
router.get('/api/grades', gradesController.getGradesApi);
router.get('/api/grade/:id', gradesController.getOneGradeApi);
router.post('/api/grade/create',upload.single('file'), gradesController.createGradeApi);
router.put('/api/grade/update/:id',upload.single('file'), gradesController.updateGradeApi);
router.delete('/api/grade/delete/:id', gradesController.deleteGradeApi);



// productGroups routes--------------------------------------------------------------------------------------------
router.get('/dashboard/product-groups',productGroupsController.getProductGroups);

// api
router.get('/api/product-groups', productGroupsController.getProductGroupsApi);
router.get('/api/product-group/:id', productGroupsController.getOneProductGroupApi);
router.post('/api/product-group/create',upload.single('file'), productGroupsController.createProductGroupApi);
router.put('/api/product-group/update/:id',upload.single('file'), productGroupsController.updateProductGroupApi);
router.delete('/api/product-group/delete/:id', productGroupsController.deleteProductGroupApi);


// categories routes-------------------------------------------------------------------------------------------------
router.get('/dashboard/categories',categoriesController.getCategories);

// api
router.get('/api/categories', categoriesController.getCategoriesApi);
router.get('/api/category/:id', categoriesController.getOneCategoryApi);
router.post('/api/category/create',upload.single('file'), categoriesController.createCategoryApi);
router.put('/api/category/update/:id',upload.single('file'), categoriesController.updateCategoryApi);
router.delete('/api/category/delete/:id', categoriesController.deleteCategoryApi);


// Auth Controllers
// const authController = require('../controllers/authController');

// router.get('/dashboard/',dashboardController.dashboard );
// router.get('/dashboard/login',authController.showLoginForm  );
// router.post('/dashboard/login',authController.login  );
// router.get('/dashboard/register',authController.register );


// router.get('/dashboard/customers',customersController.customers );

// customers routes

// router.get('/api/dashboard/customers', customersController.getAllCustomersApi);
// router.post('/api/dashboard/customer/create', customersController.apiCreateCustomer);
// router.post('/dashboard/customer/create', upload.single('photo'), customersController.createCustomer);
// router.post('/dashboard/customer/edit/:id', upload.single('photo'),customersController.updateCustomer);
// router.delete('/dashboard/customer/delete/:id', customersController.deleteCustomer);

// employees routes

// router.post('/dashboard/employee/create', upload.single('photo'), employeesController.createEmployee);
// router.post('/dashboard/employee/edit/:id', upload.single('photo'),employeesController.updateEmployee);
// router.delete('/dashboard/employee/delete/:id', employeesController.deleteEmployee);

// router.get('/api/dashboard/employees', employeesController.getAllEmployeesApi);

// profile
router.get('/dashboard/profile/:id', dashboardController.profile);

// test
router.get('/test', testController.getView);
router.post('/test/create', testController.create);

// area routes

// router.post('/dashboard/area/create', areasController.createArea);
// router.post('/dashboard/area/update/edit/:id', areasController.updateArea);
// router.delete('/dashboard/area/delete/:id', areasController.deleteArea);
// // apis
// router.get('/api/dashboard/areas', areasController.getAllAreaApi);

// firm routes

// router.post('/dashboard/firm/create', firmsController.createFirm);
// router.post('/dashboard/firm/update/edit/:id', firmsController.updateFirm);
// router.delete('/dashboard/firm/delete/:id', firmsController.deleteFirm);

// category routes

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
