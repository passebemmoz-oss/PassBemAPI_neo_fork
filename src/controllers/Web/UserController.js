const Admin = require("../../models/Admin");

module.exports = {

    async index(request, response){
        const {email, senha} = request.headers;




        const Login = await Admin.findOne({email})

        console.log(Login)

        if(!Login || senha !== Login.senha){
            return response.status(404).json("Sem permisao")
        }

        return response.json(Login)
    },

    async create(request, response){
        
        const {email, senha} = request.body;


        const data = {email, senha};

        try{    

            let users = await Admin.findOne({email})

            if(!users){
                users = await Admin.create(data)
            }

            return response.json(users)
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