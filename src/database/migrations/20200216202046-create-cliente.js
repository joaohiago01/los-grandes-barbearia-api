'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('client', {
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
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('client');
  }
};
