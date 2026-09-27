const express = require("express");

// Controllers
const { register, login, verify } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/verify", verify)

module.exports = authRouter;