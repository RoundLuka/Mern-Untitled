const express = require('express');
const { addProduct, getProduct, getProducts, deleteProduct } = require('../controllers/products.controller');
const productsRouter = express.Router();

productsRouter.post('/', addProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;