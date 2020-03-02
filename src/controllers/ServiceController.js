const Service = require('../models/Service');
const Sequelize = require('sequelize');
const db = require('../config/database');
const sequelize = new Sequelize(db);

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
                res.status(201).send({message: 'Serviço cadastrado com sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Serviço já está cadastrado.'});
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

    async list_services(req, res) {
        const service = await Service.findAll({
            order: [['name', 'asc']]
        });
        return res.json(service);
    },

    async put(req, res) {
        try {
            const {id, name, price, average_time, images} = req.body;
            if (service.length < 1) {
                service = await Service.findByPk(id);
                if (service) {
                    service = await Service.update({
                        name: name,
                        price: price,
                        average_time: average_time,
                        images: images
                    },
                    {where: {id: id}});
                    res.status(201).send({message: 'Serviço editado com sucesso!'});
                } else {
                    res.status(400).send({message: 'Erro! Por favor tente novamente.'});
                }
            } else {
                res.status(400).send({message: 'Esse Serviço já está cadastrado.'});
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
            res.status(201).send({message: 'Serviço removido com sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por favor tente novamente.'});
        }
    },

    async services_most_requests(req, res) {
        sequelize.query('select se.id, se.name, se.price, count(service_id) as requests from service as se inner join scheduling_service as ss on (se.id = ss.service_id) group by se.id order by requests desc', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    }

}