const Client = require('../models/Client');
const Barber = require('../models/Barber');
const bcrypt = require('bcrypt');

module.exports = {

    async authenticate(req, res) {
        try {
            const { phone, password } = req.body;
            const user = await Client.findOne({ where: {phone} });
            if(!user) {
                user = await Barber.findOne({ where: {phone} });
                if (!user) {
                    return res.status(400).json({ error: "Usuário não encontrado" });
                }
            }
            if (!await bcrypt.compare(password, client.password)) {
                return res.status(400).json({ error: "Senha inválida" });
            }
            return res.json({
                user: user,
                token: user.generateToken()
            });
        } catch (err) {
            return res.status(400).json({ error: "Falha na autenticação do Usuário" });
        }
    },
}