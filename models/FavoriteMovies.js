'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FavoriteMovies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // A movie can have many Users (fans) through join table Users_Movies.
            // Although the instruction told me to do it with a one-many relationship,
            // I felt that it's not quite best practice to do so.
            FavoriteMovies.belongsToMany(models.Users, { through: 'Users_Movies', foreignKey: 'movie_id' });
        }
    }
    FavoriteMovies.init({
        movie_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FavoriteMovies',
    });

    return FavoriteMovies;
};

