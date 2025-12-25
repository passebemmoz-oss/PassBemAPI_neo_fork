const Pergunta = require("../../models/Pergunta");
const Temas = require("../../models/Temas");

module.exports = {

    async index(req, res){

        const {id} = req.headers;

        console.log(req.headers)
        
        try{
            const questoes = await Pergunta.find({tema_id:id}).populate("partilhadas")

            console.log("Questoes: ",questoes)
        
            return res.status(200).json(questoes)
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
        
        const {tema, questao, alternativa_correta,  incorecta_alternativas, partilhada} = request.body;


        let filename  = request.file?.filename;

        if(!filename){
            filename = 'base.png'
        }

        const tema_id = request.headers?.temaid;


        try{

            const temas = await Temas.findById(tema_id)

            if(!temas){
                return response.status(400).json({error : "Nenhum tema registado com este ID"})
            }

            const data = {
                tema, 
                questao, 
                alternativa_correta, 
                imagem :filename , 
                incorecta_alternativas: incorecta_alternativas.split(",1,").map(opcao => opcao.trim()), 
                partilhadas: partilhada.split(",").map(opcao => opcao.trim()),
                tema_id};

                
                
            let pergunta = await Pergunta.findOne({questao})

            if(!pergunta){
                pergunta = await Pergunta.create(data)
                const Update = await Temas.updateOne({_id : tema_id},
                    {
                    "$inc": {
                        numero: 1,
                    },
                    }
                );
                

                return response.json("Questão registada com sucesso!")
            }

            await pergunta.populate("tema_id").execPopulate()

            return response.json("Questão ja registada")
        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return response.status(500).json({
                messagem:'Cadastro de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }
    },

    async update(request, response){

        const {tema, questao, alternativa_correta,  incorecta_alternativas, partilhada} = request.body;

        const {_id} = request.headers;

        let filename  = request.file?.filename;

        
        try{

            let pergunta = await Pergunta.findById(_id)

            if(!pergunta){

                return response.json("Esta questão não pode ser atualizada")
            }

            if(!filename){
                filename = pergunta.imagem
                console.log("ja tenho uma antiga")
            }


            const data = {
                tema, 
                imagem :filename,
                questao, 
                alternativa_correta, 
                incorecta_alternativas: incorecta_alternativas.split(",1,").map(opcao => opcao.trim()), 
                partilhadas: partilhada.split(",").map(opcao => opcao.trim()),
            };

            pergunta = await Pergunta.findByIdAndUpdate(
                _id,
                { $set:data},
                { useFindAndModify: false }
            );

            return response.json("Questão actualizada com sucesso!")
       } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return response.status(500).json({
                messagem:'Cadastro de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        } 

    },

    async delete(request, response){
        const tema_id = request.headers?.temaid;

        const _id =  request.params?.id;

        try{

            let pergunta = await Pergunta.deleteOne({_id,_id})

            if(!pergunta){
                return response.json("Não foi possível apagar esta questão!")
            }
            await Temas.updateOne({_id : tema_id},
                {
                "$inc": {
                    numero: -1,
                },
                }
            );

            return response.json("Questão apagada com sucesso!")

        } catch (error) {
            //This is forwarded to the global error handler. Do not change it.
            return response.status(500).json({
                messagem:'Cadastro de Anucio',
                type: "Refused",
                error_detalhe:error,
                data:{},
            })
        }
        
    },

    async deleteMany(request, response){
        const { ids } = request.body;

        if(!ids || !Array.isArray(ids) || ids.length === 0){
            return response.status(400).json({
                error: "É necessário enviar uma lista de IDs válida"
            });
        }

        try{
            // Buscar todas as perguntas para contar por tema
            const perguntas = await Pergunta.find({ _id: { $in: ids } });
            
            if(perguntas.length === 0){
                return response.status(404).json({
                    message: "Nenhuma questão encontrada com os IDs fornecidos"
                });
            }

            // Contar quantas perguntas por tema para atualizar o contador
            const temaCount = {};
            perguntas.forEach(pergunta => {
                const temaId = pergunta.tema_id.toString();
                temaCount[temaId] = (temaCount[temaId] || 0) + 1;
            });

            // Deletar as perguntas
            const result = await Pergunta.deleteMany({ _id: { $in: ids } });

            // Atualizar o contador de cada tema
            const updatePromises = Object.entries(temaCount).map(([temaId, count]) => {
                return Temas.updateOne(
                    { _id: temaId },
                    { "$inc": { numero: -count } }
                );
            });

            await Promise.all(updatePromises);

            return response.status(200).json({
                message: "Questões apagadas com sucesso!",
                deletedCount: result.deletedCount,
                requestedIds: ids.length,
                details: {
                    found: perguntas.length,
                    deleted: result.deletedCount
                }
            });

        } catch (error) {
            return response.status(500).json({
                messagem: 'Erro ao deletar questões',
                type: "Refused",
                error_detalhe: error.message,
                data: {},
            });
        }
    }
}
