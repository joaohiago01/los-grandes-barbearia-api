const Barbershop = require('../models/Barbershop');

module.exports = {
    
    async post(req, res) {
        try {
            const {location, contact, images} = req.body;
            await Barbershop.create({location, contact, images});
            res.status(201).send({message: 'Dados Cadastrados Com Sucesso!'});
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async get(req, res) {
        const barbershop = await Barbershop.findAll();
        return res.json(barbershop);
    },

    async put(req, res) {
        try {
            const {id, location, contact, images} = req.body;
            var barbershop = await Barbershop.findByPk(id);
            if (barbershop) {
                barbershop = await Barbershop.update({
                    location: location,
                    contact: contact,
                    images: images
                },
                {where: {id: id}});
                res.status(201).send({message: 'Dados Editados Com Sucesso!'});
            } else {
                res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
            }
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async delete(req, res) {
        const {id} = req.body;
        var barbershop = await Barbershop.findByPk(id);
        if (barbershop) {
            barbershop = await Barbershop.destroy({
                where: {id: id}
            });
            res.status(201).send({message: 'Dados Removidos Com Sucesso!'});
        } else {
            res.status(400).send({message: 'Erro! Por Favor Tente Novamente.'});
        }
    }

}