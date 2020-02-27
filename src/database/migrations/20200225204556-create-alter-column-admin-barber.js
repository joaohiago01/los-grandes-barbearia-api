'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('barber',
        'admin',
        Sequelize.STRING,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('barber',
        'admin',
        Sequelize.ENUM('admin', 'not admin'),
      );
  }
};
