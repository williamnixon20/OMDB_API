'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_Movies.init({
    user_id: DataTypes.UUID,
    movie_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Users_Movies',
  });
  return Users_Movies;
};