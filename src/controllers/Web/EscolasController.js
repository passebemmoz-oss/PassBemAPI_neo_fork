const Escolas = require("../../models/Escolas");


module.exports = {

    async index(req, res){

        const escolas = await Escolas.find({})

        return res.json(escolas)
        
    },

    async create(req, res){

        const {nome, provincia, distrito, lat, long, telefone} = req.body;


        const user = req.headers?.authorization;

        
        try{

            let escola = await Escolas.findOne({nome})

            if(!escola){
                
                const data = {nome, provincia, distrito, lat, long, user, telefone};

                escola = await Escolas.create(data)

                return res.json("Escola registrada com sucesso!")
            }

            return res.json(`Já existe uma escola com mesmo nome no distrito de ${escola.distrito}`)
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Cadastro de escolas',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }

    }
}