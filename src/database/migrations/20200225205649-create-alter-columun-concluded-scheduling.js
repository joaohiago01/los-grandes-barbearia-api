'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('scheduling',
        'concluded',
        Sequelize.STRING,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('scheduling',
        'concluded',
        Sequelize.ENUM('concluded', 'not concluded'),
      );
  }
};
