const {Model, DataTypes} = require('sequelize');

class Barbershop extends Model {
    static init(sequelize) {
        super.init({
            location: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Localização é obrigatório.'},
                    notNull: {msg: 'O campo Localização é obrigatório.'},
                    len: {args: [10, 60], msg: 'O campo Localização deve ter entre 10 e 60 caracteres.'}
                }
            },
            contact:{
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'O campo Contato é obrigatório.'},
                    notNull: {msg: 'O campo Contato é obrigatório.'},
                    len: {args: [10, 60], msg: 'O campo Contato deve ter entre 10 e 60 caracteres.'}
                }
            },
            images: DataTypes.BLOB,
        }, {
            sequelize,
            tableName: 'barbershop'
        })
    }
}

module.exports = Barbershop;