const Modulo = require("../../models/Modulo");

module.exports = {

    async index(req, res){
        const {user} = req.headers;

        try{
            const modulos = await Modulo.find({})

            return res.json(modulos)
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Cadastro de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }

    },

    async create(request, response){
        
        const {nome, descricao, } = request.body;

        const user = request?.headers?.authorization;
        const numero = 0;

        const data = {nome, descricao, user, numero};

        try{
            let modulos = await Modulo.findOne({nome})

            if(!modulos){
                modulos = await Modulo.create(data)
                return response.json("Módulo registado com sucesso!")
                
            }

            return response.json("Este ódulo ja esta registado")
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return response.status(500).json({
                messagem:'Cadastro de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }
        
    }
}