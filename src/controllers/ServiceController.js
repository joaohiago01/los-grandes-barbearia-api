const Service = require('../models/Service');

module.exports = {
    
    async post(req, res) {
        try {
            const {name, price, average_time, images} = req.body;
            var service = await Service.findAll({
                where: {
                    name: name
                }
            });
            if (service.length < 1) {
                service = await Service.create({name, price, average_time, images});
                res.status(201).send({message: 'Serviço Cadastrado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Serviço Já Está Cadastrado.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async get(req, res) {
        const {id} = req.body;
        const service = await Service.findByPk(id);
        return res.json(service);
    },

    async put(req, res) {
        try {
            const {id, name, price, average_time, images} = req.body;
            var service = await Service.findByPk(id);
            if (service) {
                service = await Service.update({
                    name: name,
                    price: price,
                    average_time: average_time,
                    images: images
                },
                {where: {id: id}});
                res.status(201).send({message: 'Serviço Editado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putRequests(req, res) {//TEM QUE FAZER A INCREMENTAÇÃO NA MÃO
        try {
            const {id, requests} = req.body;
            var service = await Service.findByPk(id);
            if (service) {
                service = await Service.update({
                    requests: requests
                },
                {where: {id: id}});
                res.json(service);
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async delete(req, res) {
        const {id} = req.body;
        var service = await Service.findByPk(id);
        if (service) {
            service = await Service.destroy({
                where: {id: id}
            });
            res.status(201).send({message: 'Serviço Removido Com Sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
        }
    },

    async services_most_requests(req, res) {
        const service = await Service.findAll({
            order: [['requests', 'desc']]
        });
        return res.json(service);
    }

}