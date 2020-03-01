'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('timetable',
        'time',
        Sequelize.TIME,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('timetable', 'time',);
  }
};
