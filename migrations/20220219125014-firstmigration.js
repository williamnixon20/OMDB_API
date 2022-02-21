'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("favoritemovies", {
      movie_id: {
        type: Sequelize.UUID(),
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("FavoriteMovies")
  }
};
