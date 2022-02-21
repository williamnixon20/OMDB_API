const express = require('express');
const logger = require('./logger')
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./database/connection');
const moviesRoute = require('./routes/movies')
const authRoute = require('./routes/auth')
const bootstrap = require('./src/bootstrap')
const app = express();

// Load env variables into process.env
require("dotenv").config()

// Request parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Router for desired routes! /auth would be open to all, while /movies is private.
app.use("/movies", moviesRoute);
app.use("/auth", authRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    if (process.env.PORT == null) {
        console.log(`Listening on port http://localhost:${PORT}`);
    }
})
