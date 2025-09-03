const Professores = require("../../models/Professor");
const Escolas = require("../../models/Escolas");
const Admin = require("../../models/Admin");


module.exports ={
    async index(req, res){


        try{
            const professor = await Professores.find({}).populate("escola_id")

            
            return res.json(professor)
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

    async create(req, res){

        const {nome ,telefone,  escola_id, senha, email} = req.body;

        let filename = req.file?.filename;

        const {user} = req.headers;

        if(!filename){
            filename = 'user.png'
        }


        try{

            let users = await Admin.findOne({email})

            if(!users){
                users = await Admin.create({email, senha, admin:false})
            }
            else return res.status(401).json({
                messagem:'Cadastro de professores',
                type: "Not Permit",
                error_detalhe:`Exist user with some data`,
                data:{},
            })


            let professor = await Professores.findOne({telefone})

            if(!professor){
                const data = {nome, telefone, imagem:filename, escola_id, user_id:user._id}
                
                professor = await Professores.create(data)

                return res.json("Professore registado com sucesso!")
            }

            await professor.populate("escola_id").execPopulate()
            return res.json(`${professor.nome} já esta registado como membro da escola ${professor.escola_id.nome}`)

        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Cadastro de professores',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        } 
    }
}