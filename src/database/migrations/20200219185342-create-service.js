'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('service', {
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
      price: {
       type: Sequelize.DECIMAL,
       allowNull: false,
      },
      average_time: {
       type: Sequelize.STRING,
       allowNull: false,
      },
      images: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('service');
  }
};
