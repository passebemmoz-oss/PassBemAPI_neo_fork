const Anucio = require("../../models/Anucios");

const moment = require('moment');


module.exports ={
    async index(req, res){


        try{
            const anucio = await Anucio.find({})

            
            return res.json(anucio)
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Lista de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }

    },

    async indexByTime(req, res){

        const today = moment().format('YYYY-MM-DD');


        try{
            const anucio = await Anucio.find({ validade: { $gte: today } });

            
            return res.json(anucio)
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Lista de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }

    },

    async create(req, res){

        const {nome, link, empresa,  contacto,} = req.body;

        
        let filename = req.file?.filename;

        const {user} = req.headers;

        const validade = new Date(req.body.validade) || new Date


        try{

            if(!filename){
                return res.status(401).json({
                    messagem:'Cadastro de Anucio',
                    type: "Not Permit",
                    error_detalhe:`Exist  with some data`,
                    data:{data},
                })
            }

            const data = {nome, link, empresa, active:true, validade, contacto, imagem:filename}

            const Anucios = await Anucio.create(data)


            return res.json("Anucio registado com sucesso!")

        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Cadastro de Anucio .',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        } 
    }
}