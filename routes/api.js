const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

// Rutas de productos
router.get('/products/count', productController.getProductCount);
router.get('/products/total-cost', productController.getTotalCost);

// Rutas de categorías
router.get('/categories', categoryController.getAllCategoriesWithCount);
router.get('/categories/:id/products', categoryController.getCategoryWithProducts);

module.exports = router;