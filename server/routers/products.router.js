const express = require('express');
const { addProduct, getProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/products.controller');
const productsRouter = express.Router();

productsRouter.post('/', addProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.put('/:id', updateProduct);

module.exports = productsRouter;