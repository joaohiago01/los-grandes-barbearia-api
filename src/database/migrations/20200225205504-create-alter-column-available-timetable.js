'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('timetable',
        'available',
        Sequelize.STRING,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('timetable',
        'available',
        Sequelize.ENUM('available', 'not available'),
      );
  }
};
