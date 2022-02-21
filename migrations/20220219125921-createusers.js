'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("users", {
      user_id: {
        type: Sequelize.UUID(),
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("Users")
  }
};
