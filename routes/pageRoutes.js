const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');

// Home Page
router.get('/', pageController.home);

// Products Page
router.get('/products', pageController.products);

// Products Detail Page
router.get('/product/:id', pageController.productDetail);

// Vendors Page
router.get('/vendors', pageController.vendors);

// Distribution Page
router.get('/distribution', pageController.distribution);


// Login Page
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

module.exports = router;
