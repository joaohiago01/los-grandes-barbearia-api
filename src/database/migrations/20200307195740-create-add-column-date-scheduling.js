'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('scheduling',
        'date',
        Sequelize.DATEONLY,
        {allowNull: false}
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('scheduling',
        'date',
        Sequelize.DATEONLY,
        {allowNull: false}
      );
  }
};
