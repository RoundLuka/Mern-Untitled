const express = require('express');
const { addProduct, getProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/products.controller');
const protect = require('../middleware/auth.middleware');
const productsRouter = express.Router();

productsRouter.post('/', protect, addProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', protect, deleteProduct);
productsRouter.put('/:id', protect, updateProduct);

module.exports = productsRouter;