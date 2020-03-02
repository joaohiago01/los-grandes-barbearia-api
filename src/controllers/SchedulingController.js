const Scheduling = require('../models/Scheduling');
const {Op, Sequelize} = require('sequelize');
const Service = require('../models/Service');

module.exports = {
    
    async post(req, res) {
        try {
            //FAZER UM FOR VARRENDO TODOS OS SERVIÇOS DO AGENDAMENTO E INCREMENTAR UMA VÁRIAVEL TOTAL_PRICE A CADA GET DE UM SERVIÇO
            const {client_id, barber_id, timetable_id, concluded} = req.body;
            var scheduling = await Scheduling.findAll({
                where: {
                    timetable_id: timetable_id
                }
            });
            if (scheduling.length < 1) {
                scheduling = await Scheduling.create({client_id, barber_id, timetable_id, concluded});
                res.status(201).send({message: 'Agendamento cadastrado com sucesso!'});
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
            order: [['concluded', 'asc']]
        });
        return res.json(scheduling);
    },

    async put(req, res) {
        try {
            const {id, total_price, concluded} = req.body;
            var scheduling = await Scheduling.findByPk(id);
            if (scheduling) {
                scheduling = await Scheduling.update({
                    total_price: total_price,
                    concluded: concluded
                },
                {where: {id: id}});
                return res.json(scheduling);
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

    /*async scheduling_services(req, res) {
        const {scheduling_id, service_id} = req.body;
        var service = Service.findByPk(service_id);
        var scheduling = Scheduling.findByPk(scheduling_id); 
        scheduling = await Scheduling.addServices(service);
    },*/

    async gain_in_a_day(req, res) {
        const {date} = req.body;
        var gain = await Scheduling.findAll({
            attributes: [[Sequelize.fn('sum', Sequelize.col('total_price')), 'gain']],
            where: {concluded: 'concluded'},
            include: {association: 'timetable',
            where: {date: date}},
            group: ['Scheduling.id', 'timetable.id']
        });
        return res.json(gain);
    },

    async gain_in_a_week(req, res) {
        const {date} = req.body;
        var gain = await Scheduling.findAll({
            attributes: [[Sequelize.fn('sum', Sequelize.col('total_price')), 'gain']],
            where: {concluded: 'concluded'},
            include: {association: 'timetable', [Op.between]: [Sequelize.literal(`NOW() - INTERVAL '7 DAY'`), date]},
            group: ['Scheduling.id', 'timetable.id']
        });
        return res.json(gain);
    },

    async gain_in_a_month(req, res) {
        const {date} = req.body;
        var gain = await Scheduling.findAll({
            attributes: [[Sequelize.fn('sum', Sequelize.col('total_price')), 'gain']],
            where: {concluded: 'concluded'},
            include: {association: 'timetable', [Op.between]: [Sequelize.literal(`NOW() - INTERVAL '1 MONTH'`), date]},
            group: ['Scheduling.id', 'timetable.id']
        });
        return res.json(gain);
    },

    async gain_in_a_year(req, res) {
        const {date} = req.body;
        var gain = await Scheduling.findAll({
            attributes: [[Sequelize.fn('sum', Sequelize.col('total_price')), 'gain']],
            where: {concluded: 'concluded'},
            include: {association: 'timetable', [Op.between]: [Sequelize.literal(`NOW() - INTERVAL '1 YEAR'`), date]},
            group: ['Scheduling.id', 'timetable.id']
        });
        return res.json(gain);
    }

}