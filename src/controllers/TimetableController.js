const Timetable = require('../models/Timetable');

module.exports = {
    
    async post(req, res) {
        try {
            const {time, date} = req.body;
            var timetable = await Timetable.findAll({
                where: {
                    time: time,
                    date: date
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

    async get(req, res) {
        const timetable = await Timetable.findAll({
            group: ['date', 'id'],
            order: [['time', 'asc']]
        });
        return res.json(timetable);
    },

    async put(req, res) {
        try {
            const {id, available, date} = req.body;
            var timetable = await Timetable.findByPk(id);
            if (timetable) {
                timetable = await Timetable.update({
                    available: available,
                    date: date
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

}