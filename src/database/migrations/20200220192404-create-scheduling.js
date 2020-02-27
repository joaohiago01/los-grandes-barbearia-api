'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scheduling', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'client', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      barber_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {model: 'barber', key: 'id'},
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE',
      },
      timetable_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {model: 'timetable', key: 'id'},
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE',
      },
      total_price: {
       type: Sequelize.DECIMAL,
       allowNull: false,
      },
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('scheduling');
  }
};
