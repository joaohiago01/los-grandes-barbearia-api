'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('barbershop', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contact: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      images: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
     });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('barbershop');
  }
};
