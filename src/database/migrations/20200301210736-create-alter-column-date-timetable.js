'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('timetable',
        'date',
        Sequelize.DATEONLY,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('timetable',
        'date',
        Sequelize.DATEONLY,
      );
  }
};
