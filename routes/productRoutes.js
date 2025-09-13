const express = require('express');
const router = express.Router();


// Rutas CRUD para Productos
const productController = require('../controllers/productController');

// Crear un nuevo producto
router.post('/products', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getProducts);

// Conteo de todos los productos
router.get('/products/count', productController.countProducts);

//Suma de los productos
router.get('/products/sum', productController.sumProducts);

//Productos por categoría
router.get('/products/category/:categoryId', productController.getProductsByCategory);



module.exports = router;
