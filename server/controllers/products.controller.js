// model

const Product = require("../models/products.model")


// 5 Routes
// 1. POST (Add a new product)
// 2. GET (Get all products)
// 3. GET By Id (get specific product)
// 4. DELETE by id
// 5. PUT

const addProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, icon } = req.body

        if(!name || !description || !price || !icon) {
            return res.status(400).json({
                status: "fail",
                message: "Fields that are required must be provided"
            })
        }

        const newProduct = await Product.insertOne({name, description, price, stock, icon})

        res.status(201).json({
            status: "success",
            message: "Product added sucessfully",
            product: newProduct
        })
    } catch (err) {
        res.send(err)
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            status: "success",
            message: "Retrived all products",
            products
        })
    } catch (err) {
        res.send(err.message)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id)

        if(!products) {
            return res.status(400).json({
                status: "fail",
                message: "Product with specified id doesn't exist"
            })
        }

        res.status(200).json({
            status: "success",
            message: `Retrived product with id ${id}`,
            products
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id)
        res.status(204).send()
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addProduct, getProducts, getProduct, deleteProduct }