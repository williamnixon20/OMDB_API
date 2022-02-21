const jwt = require("jsonwebtoken")

// This middleware function handles token authentication. It verifies if a user's token is legit.
function authenticateToken(req, res, next) {
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    // If it doesn't have a bearer token, tell them to get one.
    if (token == null) {
        return res.status(403).json("Use the route /auth/login to receive a Token to authenticate yourself.")
    }

    // If it does have one, verify it. Set the user.
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
        if (error) return res.status(403).json("Invalid Token. Use the route /auth/login to receive a token to authenticate yourself.")
        req.user = user;
        next()
    });
}

module.exports = { authenticateToken }