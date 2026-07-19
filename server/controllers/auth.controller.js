const User = require("../models/user.model");

// POST register (Creating a new account)
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Every credential is required"
            })
        }

        const foundObject = await User.findOne({email});  

        if(foundObject) {
            return res.status(400).json({
                status: "fail",
                message: "Account with specified email already exists!"
            })
        }

        const user = await User.create({username, email, password})

        user.password = undefined

        res.status(200).json({
            status: "success",
            message: "Account created successfully",
            account: user
        })
    } catch (err) {
        console.log(err)
    }
}

// Post login (Authorization, signing in)
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Credentials are required in order to be authorized"
            }) 
        }

        const user = await User.find({username, password});

        if(!user) {
            return res.status(400).json({
                status: "fail",
                message: "Credentials are incorrect"
            })
        }

        user.password = undefined;

        res.status(200).json({
            status: "success",
            message: "Succesfully logged in",
            user: user
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = { register, login }