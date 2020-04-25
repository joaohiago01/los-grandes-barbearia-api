const { Model, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth.json');
class Barber extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'O campo Nome é obrigatório.' },
                    notNull: { msg: 'O campo Nome é obrigatório.' },
                    len: { args: [3, 40], msg: 'O campo Nome deve ter entre 3 e 40 caracteres.' }
                }
            },//FALTA A VALIDAÇÃO PARA QUE SÓ SE ACEITE LETRAS NO NOME
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: { msg: 'Digite um e-mail válido.' }
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'O campo Telefone é obrigatório.' },
                    notNull: { msg: 'O campo Telefone é obrigatório.' },
                    isNumeric: { msg: 'O campo Telefone deve conter apenas números.' }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'O campo Senha é obrigatório.' },
                    notNull: { msg: 'O campo Senha é obrigatório.' },
                    isAlphanumeric: true,
                    len: { args: [5, 25], msg: 'O campo Senha deve ter entre 5 e 25 caracteres.' }
                }
            },
            admin: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Escolha uma opção.' },
                    notNull: { msg: 'Escolha uma opção.' },
                    isIn: [['admin', 'not admin']]
                }
            },
            available: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Escolha uma opção.' },
                    notNull: { msg: 'Escolha uma opção.' },
                    isIn: [['available', 'not available']]
                }
            },
            image: DataTypes.BLOB,
        }, {
            sequelize,
            tableName: 'barber'
        })

        /*Barber.beforeSave('hash',
            async function hashPassword(next) {
                if (!this.isModified("password")) next();
                this.password = await bcrypt.hash(this.password, 8);
            });*/
    }

    static associate(models) {
        this.hasMany(models.Scheduling, { foreignKey: 'barber_id', as: 'schedulings' });
    }

    generateToken() {
        return jwt.sign({ id: this.id }, authConfig.secret, {
            expiresIn: 86400
        });
    }
}

module.exports = Barber;