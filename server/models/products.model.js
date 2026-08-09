const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 1
    },
    icon: {
        type: String,
    },
    managerId: {
        type: String,
        default: '6a5895ab8a49953833ecd4d0'
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;