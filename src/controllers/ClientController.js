const Client = require('../models/Client');

module.exports = {
    
    async post(req, res) {
        try {
            const {name, email, phone, password} = req.body;
            var client = await Client.findAll({
                where: {
                    phone: phone,
                }
            });
            if (client.length < 1) {
                client = await Client.create({name, email, phone, password});
                res.status(201).send({message: 'Cliente Cadastrado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Cliente Já Está Cadastrado.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async get(req, res) {
        const {id} = req.body;
        const client = await Client.findByPk(id);
        return res.json(client);
    },

    async put(req, res) {
        try {
            const {id, name, email, password} = req.body;
            var client = await Client.findByPk(id);
            if (client) {
                client = await Client.update({
                    name: name,
                    email: email,
                    password: password
                },
                {where: {id: id}});
                res.status(201).send({message: 'Cliente Editado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putLoyal(req, res) {//TEM QUE FAZER A INCREMENTAÇÃO NA MÃO
        try {
            const {id, loyal} = req.body;
            var client = await Client.findByPk(id);
            if (client) {
                client = await Client.update({
                    loyal: loyal
                },
                {where: {id: id}});
                res.json(client);
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async delete(req, res) {
        const {id} = req.body;
        var client = await Client.findByPk(id);
        if (client) {
            client = await Client.destroy({
                where: {id: id}
            });
            res.status(201).send({message: 'Cliente Removido Com Sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
        }
    },

    async loyal_clients(req, res) {
        const client = await Client.findAll({
            order: [['loyal', 'desc']]
        });
        return res.json(client);
    }

}