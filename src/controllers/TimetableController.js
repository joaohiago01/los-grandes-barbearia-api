const Timetable = require('../models/Timetable');

module.exports = {
    
    async post(req, res) {
        try {
            const {date, available} = req.body;
            var timetable = await Timetable.findAll({
                where: {
                    date: date
                }
            });
            if (timetable.length < 1) {
                timetable = await Timetable.create({date, available});
                res.status(201).send({message: 'Horário Cadastrado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Horário Já Está Cadastrado.'});
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
                res.status(201).send({message: 'Horário Editado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putActivity(req, res) {//TEM QUE FAZER A INCREMENTAÇÃO NA MÃO
        try {
            const {id, activity} = req.body;
            var timetable = await Timetable.findByPk(id);
            if (timetable) {
                timetable = await Timetable.update({
                    activity: activity
                },
                {where: {id: id}});
                res.json(timetable);
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
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
            res.status(201).send({message: 'Horário Removido Com Sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
        }
    },

    async timetables_most_active(req, res) {
        const timetable = await Timetable.findAll({
            order: [['activity', 'desc']]
        });
        return res.json(timetable);
    }

}