const Barber = require('../models/Barber');

module.exports = {
    
    async post(req, res) {
        try {
            const {name, email, phone, password, admin, available, image} = req.body;
            var barber = await Barber.findAll({
                where: {
                    phone: phone
                }
            });
            if (barber.length < 1) {
                barber = await Barber.create({name, email, phone, password, admin, available, image});
                res.status(201).send({message: 'Barbeiro Cadastrado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Barbeiro Já Está Cadastrado.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async get(req, res) {
        const {id} = req.body;
        const barber = await Barber.findByPk(id);
        return res.json(barber);
    },

    async put(req, res) {
        try {
            const {id, name, email, password, admin, available, image} = req.body;
            var barber = await Barber.findByPk(id);
            if (barber) {
                barber = await Barber.update({
                    name: name,
                    email: email,
                    password: password,
                    admin: admin,
                    available: available,
                    image: image
                },
                {where: {id: id}});
                res.status(201).send({message: 'Barbeiro Editado Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async putProductivity(req, res) {//TEM QUE FAZER A INCREMENTAÇÃO NA MÃO
        try {
            const {id, productivity} = req.body;
            var barber = await Barber.findByPk(id);
            if (barber) {
                barber = await Barber.update({
                    productivity: productivity
                },
                {where: {id: id}});
                res.json(barber);
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async delete(req, res) {
        const {id} = req.body;
        var barber = await Barber.findByPk(id);
        if (barber) {
            barber = await Barber.destroy({
                where: {id: id}
            });
            res.status(201).send({message: 'Barbeiro Removido Com Sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
        }
    },

    async barbers_most_productive(req, res) {
        const barber = await Barber.findAll({
            order: [['productivity', 'desc']]
        });
        return res.json(barber);
    }

}