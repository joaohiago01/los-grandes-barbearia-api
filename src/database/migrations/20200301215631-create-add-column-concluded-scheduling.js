'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('scheduling',
        'concluded',
        Sequelize.STRING,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('scheduling', 'concluded',);
  }
};
