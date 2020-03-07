const {Model, DataTypes} = require('sequelize');

class Scheduling extends Model {
    static init(sequelize) {
        super.init({
            total_price: DataTypes.DECIMAL,
            concluded: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'not concluded',
                validate: {
                    notEmpty: {msg: 'Escolha uma opção.'},
                    notNull: {msg: 'Escolha uma opção.'},
                    isIn: [['concluded', 'not concluded']]
                }
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Data é obrigatório.'},
                    notNull: {msg: 'O campo Data é obrigatório.'},
                    isDate: true
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
            tableName: 'scheduling'
        })
    }

    static associate(models) {
        this.belongsTo(models.Client, {foreignKey: 'client_id', as: 'client'});
        this.belongsTo(models.Barber, {foreignKey: 'barber_id', as: 'barber'});
        this.belongsTo(models.Timetable, {foreignKey: 'timetable_id', as: 'timetable'});
        this.belongsToMany(models.Service, {foreignKey: 'scheduling_id', through: 'scheduling_service', as: 'service'});
    }
}

module.exports = Scheduling;