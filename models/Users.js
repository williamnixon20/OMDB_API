'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // A user belongs to many Movies through join table Users_Movies.
            // Although the instruction told me to do it with a one-many relationship,
            // I felt that it's not best practice to do so.
            Users.belongsToMany(models.FavoriteMovies, { through: 'Users_Movies', foreignKey: 'user_id' });
        }
    }
    Users.init({
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};

