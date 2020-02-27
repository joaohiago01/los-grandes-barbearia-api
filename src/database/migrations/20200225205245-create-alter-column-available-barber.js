'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('barber',
        'available',
        Sequelize.STRING,
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('barber',
        'available',
        Sequelize.ENUM('available', 'not available'),
      );
  }
};
