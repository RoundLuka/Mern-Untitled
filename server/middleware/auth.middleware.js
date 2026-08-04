const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
    const token = req.cookies.JWT_Token

    if(!token) {
        return res.status(400).json({
            message: "JWT Token is required to proceed with operation"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if(!payload) {
            return res.status(400).json({
                message: "Token is either incorrect or expired"
            })
        }

        const user = await User.find({email: payload.email})

        if(!user) {
            return res.status(400).json({
                message: "Token is either incorrect or expired"
            })
        }
        
        req.user = user
        req.userId = payload.userId
        next();
    } catch (err) {
        res.status(400).json({
            message: "Invalid token"
        })
    }
}

module.exports = protect;