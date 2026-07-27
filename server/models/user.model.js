const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

// pre - სანამ 
// save - შენახავა
userSchema.pre('save', async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})


// Model allows us to modify documents within a collection. CRUD (Create, Read, Update, Delete)
const User = mongoose.model("User", userSchema)

module.exports = User;