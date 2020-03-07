const Timetable = require('../models/Timetable');
const {Op} = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../config/database');
const sequelize = new Sequelize(db);

module.exports = {
    
    async post(req, res) {
        try {
            const {time, date} = req.body;
            var timetable = await Timetable.findAll({
                where: {
                    date: date,
                    time: time
                }
            });

            if (timetable.length < 1) {
                timetable = await Timetable.create({time, date});
                res.status(201).send({message: 'Horário cadastrado com sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Horário já está cadastrado.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async list_timetable(req, res) {
        const timetable = await Timetable.findAll({
            group: ['date', 'id'],
            order: [['time', 'asc']]
        });
        return res.json(timetable);
    },

    async get(req, res) {
        const {date} = req.body;
        const timetable = await Timetable.findAll({
            where: {date: date}
        })
        return res.json(timetable);
    },

    async put(req, res) {
        try {
            const {id, available, time} = req.body;
            var timetable = await Timetable.findByPk(id);
            if (timetable) {
                timetable = await Timetable.update({
                    available: available,
                    time: time
                },
                {where: {id: id}});
                res.status(201).send({message: 'Horário editado com sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por favor tente novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putTimetableDay(req, res) {
        try {
            const {available, date} = req.body;
            timetable = await Timetable.update({
                available: available,
            },
            {where: {date: date}});
            res.status(201).send({message: 'Horário(s) editado(s) com sucesso!'});
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putTimetableDayForHour(req, res) {
        try {
            const {available, date, timeBegin, timeEnd} = req.body;
            timetable = await Timetable.update({
                available: available,
            },
            {where: {date: date, time: {[Op.between]: [timeBegin, timeEnd]}}});
            res.status(201).send({message: 'Horário(s) editado(s) com sucesso!'});
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putAllTimetable(req, res) {
        try {
            const {date, time, available} = req.body;
            timetable = await Timetable.update({
                date: date,
                available: available
            },
            {where: {time: time}});
            res.status(201).send({message: 'Horário(s) editado(s) com sucesso!'});
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async delete(req, res) {
        const {id} = req.body;
        var timetable = await Timetable.findByPk(id);
        if (timetable) {
            timetable = await Timetable.destroy({
                where: {id: id}
            });
            res.status(201).send({message: 'Horário removido com sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por favor tente novamente.'});
        }
    },

    async clients_affected_day(req, res) {
        const {date} = req.body;
        var date_format = "'" + date.toString() + "'";
        var concluded = "'" + "not concluded" + "'";
        sequelize.query('select c.id, c.name, c.phone, c.email from client as c inner join scheduling as s on (c.id = s.client_id) where s.concluded = ' + concluded + ' and s.date = ' + date_format, {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    },

    async clients_affected_day_for_hour(req, res) {
        const {date, timeBegin, timeEnd} = req.body;
        var date_format = "'" + date.toString() + "'";
        var concluded = "'" + "not concluded" + "'";
        var timeBegin_format = "'" + timeBegin.toString() + "'";
        var timeEnd_format = "'" + timeEnd.toString() + "'";
        sequelize.query('select c.id, c.name, c.phone, c.email from client as c inner join scheduling as s on (c.id = s.client_id) where s.concluded = ' + concluded + ' and s.date = ' + date_format + ' and s.time between ' + timeBegin_format + ' and ' + timeEnd_format, {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    }

}