'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('timetable', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true,
      },
      available: {
        type: Sequelize.ENUM('available', 'not available'),
        allowNull: false,
      },
     });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('timetable');
    
  }
};
