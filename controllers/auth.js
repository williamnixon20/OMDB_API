const { Users } = require('../models');
const bcrypt = require('bcrypt')
const logger = require('../logger')
const jwt = require('jsonwebtoken')

// This function is the controller for the /auth/login route.
// It validates the name and password given by comparing it to the hashed value in the DB.
const authLogin = async (req, res) => {
    logger.info("/auth/login is accessed. Validating credentials..")
    try {
        const name = req.body.name;
        const password = req.body.password;
        if (!name || !password) {
            throw Error("Name/Password is undefined!")
        }
        // Find user and then compare passwords. If it doesn't exist, throw error.
        const user = await Users.findOne({
            where: {
                name: name
            },
            attributes: ["name", "password", "user_id"]
        })
        if (!user) {
            throw Error("User/Password does not exist.")
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw Error("User/Password does not exist.")
        }
        const user_signed = { name: name, password: user.password, user_id: user.user_id }
        const accessToken = jwt.sign(user_signed, process.env.ACCESS_TOKEN);
        //Add cookie as per instruction (?)
        res.cookie('JWT', accessToken);

        res.status(200).json({ accessToken: accessToken });
    } catch (err) {
        logger.error(err.message)
        res.status(400).json(err.message)
    }
}

module.exports = { authLogin }
