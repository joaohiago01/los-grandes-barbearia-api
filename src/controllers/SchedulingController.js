const Scheduling = require('../models/Scheduling');
const Service = require('../models/Service');
const Sequelize = require('sequelize');
const db = require('../config/database');
const sequelize = new Sequelize(db);

module.exports = {
    
    async post(req, res) {
        try {
            const {client_id, barber_id, timetable_id, services_id} = req.body;
            var scheduling = await Scheduling.findAll({
                where: {
                    timetable_id: timetable_id
                }
            });
            if (scheduling.length < 1) {
                var total_price = 0;
                for (let index = 0; index < services_id.length; index++) {
                    var service_id = services_id[index];
                    const service = await Service.findByPk(service_id);
                    total_price = total_price + parseFloat(service.price);
                }
                scheduling = await Scheduling.create({client_id, barber_id, timetable_id, total_price});
                for (let index = 0; index < services_id.length; index++) {
                    var service_id = services_id[index];
                    const [service] = await Service.findOrCreate({where: {id: service_id}});
                    await scheduling.addService(service);
                }
                
                res.status(201).send({message: 'Agendamento realizado com sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Agendamento já está cadastrado.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async get(req, res) {
        const {id} = req.body;
        const scheduling = await Scheduling.findByPk(id);
        return res.json(scheduling);
    },

    async list_schedulings(req, res) {
        const scheduling = await Scheduling.findAll({
            order: [['concluded', 'desc']]
        });
        return res.json(scheduling);
    },

    async put(req, res) {
        try {
            const {id, concluded} = req.body;
            var scheduling = await Scheduling.findByPk(id);
            if (scheduling) {
                scheduling = await Scheduling.update({
                    concluded: concluded
                },
                {where: {id: id}});
                res.status(201).send({message: 'Agendamento finalizado com sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por favor tente novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async delete(req, res) {
        const {id} = req.body;
        var scheduling = await Scheduling.findByPk(id);
        if (scheduling) {
            scheduling = await Scheduling.destroy({
                where: {id: id}
            });
            res.status(201).send({message: 'Agendamento removido com sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por favor tente novamente.'});
        }
    },

    async gain_of_the_today(req, res) {
        sequelize.query('select sum(total_price) as gain from scheduling as s inner join timetable as t on (s.timetable_id = t.id) where date = current_date', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    },

    async gain_in_a_specific_day(req, res) {
        const {date} = req.body;
        var date_format = "'" + date.toString() + "'";
        sequelize.query('select sum(total_price) as gain from scheduling as s inner join timetable as t on (s.timetable_id = t.id) where date = ' + date_format, {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    },

    async gain_from_specific_day(req, res) {
        const {date} = req.body;
        var date_format = "'" + date.toString() + "'";
        sequelize.query('select sum(total_price) as gain from scheduling as s inner join timetable as t on (s.timetable_id = t.id) where date between ' + date_format + ' and current_date;', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    },

    async gain_in_a_week(req, res) {
        sequelize.query('select sum(total_price) as gain from scheduling as s inner join timetable as t on (s.timetable_id = t.id) where date between (current_date - INTERVAL ' + "'" + '7 DAY' + "'" + ') and current_date', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    },

    async gain_in_a_month(req, res) {
        sequelize.query('select sum(total_price) as gain from scheduling as s inner join timetable as t on (s.timetable_id = t.id) where date between (current_date - INTERVAL ' + "'" + '1 MONTH' + "'" + ') and current_date', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    },

    async gain_in_a_year(req, res) {
        sequelize.query('select sum(total_price) as gain from scheduling as s inner join timetable as t on (s.timetable_id = t.id) where date between (current_date - INTERVAL ' + "'" + '1 YEAR' + "'" + ') and current_date', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    }

}