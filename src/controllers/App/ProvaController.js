const Respostas = require('../../models/Respostas');
const Prova = require('../../models/Provas');
const ProvasModular = require('../../models/ProvasModular');
const RespostasModular = require('../../models/RespostasModular')

module.exports = {
    
    async index(req, res){

        const user_id = req.headers.authorization

        
        try{

            const response = await Prova.find({user:user_id,"numero": { "$gte": 20 } })

            const modulares = await ProvasModular.find({user:user_id,"numero": { "$gte": 20 } })
            
            response.reverse()

            modulares.reverse()

            return res.json({message:"Sucesso!", response, modulares})
        }catch{
            return res.status(404).json({message:"Falha na busca"})
        }
    },

    async indexOne(req, res){

        const {id} = req.params;

        console.log(id)

        try{
            const resposta = await Respostas.find({ prova:id, })
                .populate('questao')
                .populate('prova')
                .exec()

            return res.json({message:'Sucesso!',resposta})
            
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Falha na busca de respostas',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }
    },

    async indexOneModular(req, res){

        const {id} = req.params;



       try{
            const resposta = await RespostasModular.find({ prova:id, })
                .populate('questao')
                .populate('prova')
                .exec()


            return res.json({message:'Sucesso!',resposta})
            
        }catch{
            return res.status(401).json('Operation not permit')
        }
    },

    async create(req, res){

        const { ProvaFeita, pts} = req.body;

        const {authorization} = req.headers

        let iD = ''


        try{
            ProvaFeita.map( async (item, index) =>  {

                const data = {
                    resposta: item.userOption,
                    user: authorization,
                    prova: item.prova,
                    questao: item.questao,
                }

                iD = item.prova

                const respostas = await Respostas.create(data)

                if(respostas){
                    await Prova.updateOne({_id : item.prova},
                        {
                        "$inc": {
                            numero: 1,
                        },
                        resultado:pts,
                        }
                    );
                }
            })

            const toreviw = await Prova.findOne({_id : iD})

            console.log('toreviw :', toreviw)
            
            return res.json({
                message:'Teste salvo com sucesso',
                data:toreviw
            })
        }catch{
            if(!error.statusCode) error.statusCode = 500
        }

        
    },

    async createModular(req, res){

        const { ProvaFeita, pts, modulo} = req.body;

        const {authorization} = req.headers


        try{

            const provamodular = await ProvasModular.create({
                modulo_nome:modulo.nome,
                user:authorization,
                modulo_id: modulo._id
            })

            ProvaFeita.map( async (item, index) =>  {

                const data = {
                    resposta: item.userOption,
                    user: authorization,
                    questao: item.questao,
                    prova: provamodular._id
                }

                const respostas = await RespostasModular.create(data)

                if(respostas){
                    await ProvasModular.updateOne({_id : provamodular._id},
                        {
                        "$inc": {
                            numero: 1,
                        },
                        resultado:pts,
                        }
                    );
                }
            })
            
            

            return res.status(200)
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return res.status(500).json({
                messagem:'Cadastro de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }

        
    }
}