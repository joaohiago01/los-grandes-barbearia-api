'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.removeConstraint('timetable',
        'timetable_date_key'
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('timetable',
        'timetable_date_key'
      );
  }
};
