const models = require('../models');
const axios = require('axios')
const logger = require('../logger');

const Users = models.Users;
const FavoriteMovies = models.FavoriteMovies

// Return the URLS of a user's favorite movies.
const getUserURLMovies = async (req, res) => {
    logger.info("GET /movies/favorite is accessed.")
    try {
        const name = req.user.name;
        // Find all of a user's favorite movie titles.
        const movies = await models.Users.findAll({
            where: { name: name },
            include: {
                model: models.FavoriteMovies,
                as: "FavoriteMovies",
                attributes: ['title'],
                through: {
                    attributes: [],
                }
            },
            attributes: []
        }, { raw: true });

        // Make an api request to omdbapi and get the URLS returned in an array.
        const poster_urls = []

        for (const movie of movies[0]["FavoriteMovies"]) {
            const title = movie.title;
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`);
            poster_urls.push(response.data.Poster);
        }
        // Send the URLS back.
        res.status(200).json(poster_urls);
    } catch (err) {
        logger.error(err);
        res.status(500).json(err.message)
    }
}

// Return the URL of a particular movie title
const getURLTitle = async (req, res) => {
    logger.info("GET /movies/:title is accessed.")
    try {
        const title = req.params.title;
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`)
        console.log(response.data.Poster)
        res.status(200).json(response.data.Poster)
    } catch (err) {
        logger.error(err)
        res.status(500).json(err.message)
    }
}

// Create a new relation between user and movies.
const postUserMovies = async (req, res) => {
    logger.info('POST /movies/favorite is accessed')
    try {
        // Find movie with that particular title, if not found, create one.
        const [movie, created] = await FavoriteMovies.findOrCreate({
            where: { title: req.body.title },
            default: {
                title: req.body.title
            }
        })

        // Find User, and then associate user with that movie.
        const user = await Users.findByPk(req.user.user_id)
        await user.addFavoriteMovies(movie)

        res.status(200).send("Succesfully inserted / Already exists.")
    } catch (err) {
        logger.error(err);
        res.status(500).json(err.message)
    }
}

module.exports = { getUserURLMovies, postUserMovies, getURLTitle }

