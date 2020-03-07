const {Model, DataTypes} = require('sequelize');

class Timetable extends Model {
    static init(sequelize) {
        super.init({
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Data é obrigatório.'},
                    notNull: {msg: 'O campo Data é obrigatório.'},
                    isDate: true
                }
            },
            available: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'available',
                validate: {
                    notEmpty: {msg: 'Escolha uma opção.'},
                    notNull: {msg: 'Escolha uma opção.'},
                    isIn: [['available', 'not available']]
                }
            },

            time: {
                type: DataTypes.TIME,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Hora é obrigatório.'},
                    notNull: {msg: 'O campo Hora é obrigatório.'},
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