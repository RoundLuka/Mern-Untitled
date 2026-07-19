const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})


// Model allows us to modify documents within a collection. CRUD (Create, Read, Update, Delete)
const User = mongoose.model("User", userSchema)

module.exports = User;