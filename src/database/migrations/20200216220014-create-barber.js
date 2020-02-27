'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('barber', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
       },
      phone: {
       type: Sequelize.STRING,
       allowNull: false,
      },
      password: {
       type: Sequelize.STRING,
       allowNull: false,
      },
      admin: {
        type: Sequelize.ENUM('admin', 'not admin'),
        allowNull: false,
      },
      available: {
        type: Sequelize.ENUM('available', 'not available'),
        allowNull: false,
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('barber');
  }
};
