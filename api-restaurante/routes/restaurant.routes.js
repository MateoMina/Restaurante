const express = require('express');
const router = express.Router();
const restaurantController = require('./controllers/restaurantController.js');
const userController = require('./controllers/userController.js');
const productController = require('./controllers/productController.js');
const salesController = require('./controllers/salesController.js');

// restaurant
router.use('/', restaurantController);

// users
router
    .patch('/login', userController.login)
    .get('/users', userController.getAllUsers)
    .get('/user/:userId', userController.getUser)
    .post('/user', userController.createUser)
    .delete('/user', userController.deleteUser)
    .put('/user', userController.updateUser);

// product
router
    .get('/products', productController.getAllProducts)
    .post('/product', productController.createProduct)
    .delete('/product', productController.deleteProduct)
    .put('/product', productController.updateProduct);

// sales
router
    .get('/sales', salesController.getAllSales)
    .post('/sales', salesController.createSales)
    .put('/sale', salesController.updateSale);

module.exports = router;