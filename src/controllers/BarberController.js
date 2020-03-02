const Barber = require('../models/Barber');
const Sequelize = require('sequelize');
const db = require('../config/database');
const sequelize = new Sequelize(db);

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
                res.status(201).send({message: 'Barbeiro cadastrado com sucesso!'});
            } else {
                res.status(400).send({message: 'Esse Barbeiro já está cadastrado.'});
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

    async list_barbers(req, res) {
        const barber = await Barber.findAll({
            order: [['name', 'asc']]
        });
        return res.json(barber);
    },

    async put(req, res) {
        try {
            const {id, name, email, password, admin, available, image} = req.body;
            sequelize.query('select * from barber where name = name and id != id', {type: sequelize.QueryTypes.SELECT}).then(results => {
                if (results.isEmpty == true) {
                    var barber = Barber.findByPk(id);
                    if (barber) {
                        barber = Barber.update({
                            name: name,
                            email: email,
                            password: password,
                            admin: admin,
                            available: available,
                            image: image
                        },
                        {where: {id: id}});
                        res.json(barber);
                        //res.status(201).send({message: 'Barbeiro editado com sucesso!'});
                    } else {
                        res.status(400).send({message: 'Erro! Por favor tente novamente.'});
                    }
                } else {
                    res.json(results);
                    //res.status(400).send({message: 'Esse Barbeiro já está cadastrado.'});
                }
            });
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
            res.status(201).send({message: 'Barbeiro removido com sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por favor tente novamente.'});
        }
    },

    async barbers_most_productive(req, res) {
        sequelize.query('select b.id, b.name, count(barber_id) as productivity from barber as b inner join scheduling as s on (b.id = s.barber_id) where s.concluded = "concluded" group by b.id order by productivity desc', {type: sequelize.QueryTypes.SELECT}).then(results => {
            return res.json(results);
        });
    }

}