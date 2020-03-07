'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('scheduling',
        'timetable_id',
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('scheduling', 'timetable_id', Sequelize.INTEGER);
  }
};
