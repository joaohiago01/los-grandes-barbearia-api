const {Model, DataTypes} = require('sequelize');

class Service extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Nome é obrigatório.'},
                    notNull: {msg: 'O campo Nome é obrigatório.'},
                    len: {args: [3, 60], msg: 'O campo Nome deve ter entre 3 e 60 caracteres.'}
                }
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Preço é obrigatório.'},
                    notNull: {msg: 'O campo Preço é obrigatório.'},
                    isDecimal: true,
                    min: 1
                }
            },
            average_time: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Tempo Médio é obrigatório.'},
                    notNull: {msg: 'O campo Tempo Médio é obrigatório.'},
                    len: {args: [4, 20], msg: 'O campo Tempo Médio deve ter entre 4 e 20 caracteres.'}
                }
            },
            images: DataTypes.BLOB,
        }, {
            sequelize,
            tableName: 'service'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Scheduling, {foreignKey: 'service_id', through: 'scheduling_service', as: 'scheduling'});
    }
}

module.exports = Service;