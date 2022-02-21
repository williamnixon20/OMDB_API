const router = require('express').Router();
const models = require('../models')
const logger = require('../logger')
const { getUserURLMovies, getURLTitle, postUserMovies } = require('../controllers/movies')
const { authenticateToken } = require('../jwt')

// If they're not authenticated, they're not allowed to be in this route!
router.use(authenticateToken);

// GET /movies will by default respond by 403 (as per Instruction)
router.get("/", async (req, res) => {
    res.status(403).json("403 Forbidden");
})

// GET /movies/favorite will get users their favorite movies' URLs. 
router.get("/favorite", getUserURLMovies)

// POST /movies/favorite will allow users to add to their list.
router.post("/favorite", postUserMovies)

// GET /Movies/:title will allow users to get a particular movie's poster URL
router.get("/:title", getURLTitle)
module.exports = router