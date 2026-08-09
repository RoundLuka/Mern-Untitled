// Modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

// Routers
const authRouter = require("./routers/auth.router");
const productsRouter = require("./routers/products.router");

// Server init
const app = express();

// Loading sensitive variables form .env file
dotenv.config()

// Using Middlewares

// -------- Security Middleware --------
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true 
}));
app.use(cookieParser())

// -------- Helper Middleware ---------
app.use(express.json());

// -------- Monitoring Middleware --------
app.use(morgan('dev'));

// -------- Routers ---------
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)

// Testing server activity
app.get("/api/test", (req, res, next) => {
    res.send('Server is running!')
})


// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send()
})

// Running server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Mongo database")

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => console.log(err))
