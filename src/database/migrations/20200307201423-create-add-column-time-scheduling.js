'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('scheduling',
        'time',
        Sequelize.TIME,
        {allowNull: false}
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('scheduling', 'time',{allowNull: false});
  }
};
