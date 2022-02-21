const Sequelize = require('sequelize');
const logger = require('../logger')

// Establish connection and sync everything up.
// Give sequelize a valid db URI.
const sequelize = new Sequelize('mysql://user:password@localhost:3306/dbname')
sequelize.authenticate()
    .then(logger.info("DB connection established!"))
    .catch((error) => logger.error(`${error}`))
sequelize.sync()
    .then(logger.info("Sync success!"))
    .catch((error) => logger.error(`${error}`))

module.exports = sequelize;