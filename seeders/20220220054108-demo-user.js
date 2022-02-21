'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

// Seeder! I seeded all my test data using this script.
module.exports = {
  async up(queryInterface, Sequelize) {
    let movies = ["Spiderman 2", "The Incredibles", "Pocoyo", "Hamtaro", "Tron"]
    let users = ["Hannah", "Montana", "Grace", "Brian", "Mike"]
    let passwords = ["1234", "2345", "3456", "4567", "5678"]

    // Hash each and every password.
    let mock_hashedpass = []
    for (let password of passwords) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      mock_hashedpass.push(hashedPassword)
    }


    // Append datas to a list
    let users_data = []
    let movies_data = []

    for (let i = 0; i < users.length; i++) {
      users_data.push({
        user_id: uuidv4(),
        name: users[i],
        password: mock_hashedpass[i],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    for (let i = 0; i < movies.length; i++) {
      movies_data.push({
        movie_id: uuidv4(),
        title: movies[i],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insert everything into our tables.
    await queryInterface.bulkInsert('Users', users_data);
    await queryInterface.bulkInsert('FavoriteMovies', movies_data)

    // Determine a relationship for every user and movie (Join Table).
    let relations_data = []

    for (let i = 0; i < users.length; i++) {
      relations_data.push({ user_id: users_data[i].user_id, movie_id: movies_data[i].movie_id, createdAt: new Date(), updatedAt: new Date() })
      relations_data.push({ user_id: users_data[i].user_id, movie_id: movies_data[(i + 1) % 5].movie_id, createdAt: new Date(), updatedAt: new Date() })
      relations_data.push({ user_id: users_data[i].user_id, movie_id: movies_data[(i + 2) % 5].movie_id, createdAt: new Date(), updatedAt: new Date() })
    }

    // Push everything to the join_table.
    await queryInterface.bulkInsert('Users_Movies', relations_data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
    await queryInterface.bulkDelete('FavoriteMovies', null)
    await queryInterface.bulkDelete('Users_Movies', null)
  }
};
