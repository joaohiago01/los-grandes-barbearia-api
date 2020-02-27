const {Model, DataTypes} = require('sequelize');

class Timetable extends Model {
    static init(sequelize) {
        super.init({
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Data e Hora é obrigatório.'},
                    notNull: {msg: 'O campo Data e Hora é obrigatório.'},
                    isDate: true
                }
            },
            available: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'Escolha uma opção.'},
                    notNull: {msg: 'Escolha uma opção.'},
                    isIn: [['available', 'not available']]
                }
            },
        }, {
            sequelize,
            tableName: 'timetable'
        })
    }

    static associate(models) {
        this.hasOne(models.Scheduling, {foreignKey: 'timetable_id', as: 'scheduling'});
    }
}

module.exports = Timetable;