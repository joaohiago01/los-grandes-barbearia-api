const Timetable = require('../models/Timetable');

module.exports = {
    
    async post(req, res) {
        try {
            const {date, available, time} = req.body;
            var timetable = await Timetable.findAll({
                where: {
                    date: date,
                    time: time
                }
            });
            if (timetable.length < 1) {
                timetable = await Timetable.create({date, available, time});
                res.status(201).send({message: 'Horário cadastrado com sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Horário já está cadastrado.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async get(req, res) {
        const timetable = await Timetable.findAll({
            order: [['date', 'asc']]
        });
        return res.json(timetable);
    },

    async put(req, res) {
        try {
            const {id, available} = req.body;
            var timetable = await Timetable.findByPk(id);
            if (timetable) {
                timetable = await Timetable.update({
                    available: available
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

    async timetables_most_active(req, res) {
        const timetable = await Timetable.findAll({
            order: [['activity', 'desc']]
        });
        return res.json(timetable);
    }

}