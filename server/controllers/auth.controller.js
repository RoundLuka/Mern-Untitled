const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config()

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

        await user.sendVerificationCode(user.email)

        user.password = undefined
        user.code = undefined

        res.status(200).json({
            status: "success",
            message: "Account created successfully",
            user
        })
    } catch (err) {
        console.log(err)
    }
}

// Post login (Authorization, signing in)
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Credentials are required in order to be authorized"
            }) 
        }

        const user = await User.findOne({email});
        

        if(!user) {
            return res.status(400).json({
                status: "fail",
                message: "Credentials are incorrect"
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if(!isCorrect) {
            return res.status(400).json({
                status: "fail",
                message: "Credentials are incorrect"
            })
        }

        if(!user.isVerified) {
            return res.status(401).json({
                status: "fail",
                message: "You must first verify email address"
            })
        }
        
        // 1. Payload ობიექტი, მომხმარებლის ინფორმაცია
        // 2. Server-ის საიდმულო გასაღები secret
        // 3. დამატებიტი ოპციები, token-ის ვადა

        
        const token = jwt.sign(
            {userId: user._id, username: user.username, email: user.email}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRE_TIME}
        );

        user.password = undefined;

        res.cookie('JWT_Token', token, { 
            maxAge: Number(process.env.JWT_DUE) * 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV !== 'dev', 
            httpOnly: true, 
            sameSite: 'lax' 
        });

        res.status(200).json({
            status: "success",
            message: "Succesfully logged in",
            user
        })

    } catch (err) {
        console.log(err)
    }
}


// verify email via smtp standard code (OAuth2)
const verify = async (req, res, next) => {
    try {
        const { code } = req.body;

        // 2 accounts can have same verification code
        const accountWithCode = await User.findOne({code})

        if(!accountWithCode) {
            return res.status(400).json({
                status: 'fail',
                message: "Verification code is expired or invalid"
            })
        }

        accountWithCode.isVerified = true
        accountWithCode.code = undefined

        await accountWithCode.save()

        res.status(200).json({
            status: "success",
            message: "Verification successful!"
        })

    } catch (err) {
        console.log(err)
    } 
}

module.exports = { register, login, verify }