'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scheduling_service', {
      scheduling_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'scheduling', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      service_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'service', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
     });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('scheduling_service');
  }
};
