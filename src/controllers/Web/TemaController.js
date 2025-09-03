const Temas = require("../../models/Temas");

module.exports = {
    async index(req, res){
        //const {user} = req.headers;

        try{
            const temass = await Temas.find({})


            return res.json(temass)
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return response.status(500).json({
                messagem:'Cadastro de temas',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }


        

    },
    async create(request, response){
        
        const {nome, descricao, } = request.body;


        const user = request.headers.user;
        const numero = 0;

        const data = {nome, descricao, user, numero};

        try{

            let temas = await Temas.findOne({nome})

            if(!temas){
                temas = await Temas.create(data)

                return response.json("Tema registado com sucesso!")
            }

            await temas.populate("UserPassBemm").execPopulate()
            

            return response.json("Já existe um tema com o mesmo nome!")
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return response.status(500).json({
                messagem:'Cadastro de Temas',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }
    }
}