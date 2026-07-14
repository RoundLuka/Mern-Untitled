// Modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Server init
const app = express();

// Loading sensitive variables form .env file
dotenv.config()

// Using Middlewares

// -------- Security Middleware --------
app.use(cors());

// -------- Helper Middleware ---------
app.use(express.json());

// -------- Monitoring Middleware --------
app.use(morgan('dev'));

// Running server

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Mongo database")

        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.log(err))

// env - envrionmental variables