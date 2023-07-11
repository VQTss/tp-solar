
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');

const descProductsController = require('../../controllers/descProducts.controller');

const imageProductController = require("../../controllers/imageProduct.controller");

const middlewareControllers = require('../../auth/auth.util');


// ============================= Middleware

// ============================= Routes

router.get('/', productController.getProducts);  //  get all products
router.post('/get-produt-by-id', productController.getProductById); // get product by id
router.post('/get-product-by-category', productController.getProductByCategory); // get product by category
router.post('/get-desc-product', descProductsController.getDescProductsByID); // get desc product by id
router.post('/get-image-product', imageProductController.getImageProduct); // get image product by id

// Authenticated routes

router.use(middlewareControllers.verifyToken);
router.use(middlewareControllers.verifyTokenAndAdminAuth);

// End authenticated routes
router.post('/create-desc-product', descProductsController.createDescProduct); // create desc product
router.post('/create-product', productController.createProduct); // create product
router.put('/update-product', productController.updateProduct); // update product
router.delete('/delete-product', productController.deleteProduct); // delete product
router.post('/create-image-product', imageProductController.createImageProduct); // create image product
router.put('/update-image-product', imageProductController.updateImageProduct); // update image product
router.delete('/delete-image-product', imageProductController.deleteImageProduct); // delete image product

module.exports = router;