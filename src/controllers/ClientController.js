const Client = require('../models/Client');
const Barber = require('../models/Barber');
const Sequelize = require('sequelize');
const db = require('../config/database');
const sequelize = new Sequelize(db);

module.exports = {

    async post(req, res) {
        try {
            const { name, email, phone, password } = req.body;
            var client = await Client.findAll({
                where: {
                    phone: phone,
                }
            });
            var barber = await Barber.findAll({
                where: {
                    phone: phone
                }
            });
            if (barber.length >= 1) {
                res.status(400).send({ message: 'Esse Telefone já está sendo usado.' });
            } else {
                if (client.length < 1) {
                    client = await Client.create({ name, email, phone, password });
                    //res.status(201).send({message: 'Cliente cadastrado com sucesso!'});
                    return res.json({
                        client: client,
                        token: client.generateToken()
                    });
                } else {
                    res.status(400).send({ message: 'Esse Cliente já está cadastrado.' });
                }
            }
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },

    async get(req, res) {
        const { id } = req.body;
        const client = await Client.findByPk(id);
        return res.json(client);
    },

    async list_clients(req, res) {
        const client = await Client.findAll({
            order: [['name', 'asc']]
        });
        return res.json(client);
    },

    async put(req, res) {
        try {
            const { id, name, email, password } = req.body;
            var client = await Client.findByPk(id);
            if (client) {
                client = await Client.update({
                    name: name,
                    email: email,
                    password: password
                },
                    { where: { id: id } });
                res.status(201).send({ message: 'Cliente editado com sucesso!' });
            } else {
                res.status(400).send({ message: 'Erro! Por favor tente novamente.' });
            }
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    },

    async delete(req, res) {
        const { id } = req.body;
        var client = await Client.findByPk(id);
        if (client) {
            client = await Client.destroy({
                where: { id: id }
            });
            res.status(201).send({ message: 'Cliente removido com sucesso!' });
        } else {
            res.status(400).send({ message: 'Erro! Por favor tente novamente.' });
        }
    },

    async loyal_clients(req, res) {
        sequelize.query('select c.id, c.name, count(client_id) as loyal from client as c inner join scheduling as s on (c.id = s.client_id) where s.concluded = "concluded" group by c.id order by loyal desc', { type: sequelize.QueryTypes.SELECT }).then(results => {
            return res.json(results);
        });
    }

}