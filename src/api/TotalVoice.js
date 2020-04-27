const totalvoice = require('totalvoice-node');
const client = new totalvoice('0a48455708e04b275e96af094c22e628', 'https://api2.totalvoice.com.br/verificacao');

module.exports = {

    async verificationPhone(req, res) {
        const {phone, product} = req.body;
        client.verificacao.enviar(phone, product)
            .then(function (data) {
                res.status(200).json(data);
            })
            .catch(function (error) {
               res.status(400).json(error);
            });
    },

    async validatePhone(req, res) {
        const {id, cod} = req.body;
        client.verificacao.buscar(id, cod)
            .then(function (data) {
                res.status(200).json(data);
            })
            .catch(function (error) {
               res.status(400).json(error);
            });
    }
}