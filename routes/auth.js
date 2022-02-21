const router = require('express').Router();
const models = require('../models')
const logger = require('../logger')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { authenticateToken } = require('../jwt')
const { authLogin } = require('../controllers/auth')

// When users get to auth, tell them if they're using the right token or not.
router.get('/', authenticateToken, (req, res) => {
    if (req.user) {
        res.status(200).json(`Hello, ${req.user.name}`)
    }
})

// Urge them to do a post request.
router.get('/login', (req, res) => {
    res.status(200).json("Send a post request containing your name and password here.")
})

// Will validate their credentials using authLogin controller.
router.post('/login', authLogin)

module.exports = router