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
    },

    async update(request, response){
        
        const { id } = request.params;
        const { nome, descricao } = request.body;

        try{
            // Verificar se o tema existe
            const temaExiste = await Temas.findById(id);
            
            if(!temaExiste){
                return response.status(404).json({
                    message:'Tema não encontrado',
                    type: "Not Found",
                })
            }

            // Verificar se já existe outro tema com o mesmo nome
            if(nome && nome !== temaExiste.nome){
                const temaComMesmoNome = await Temas.findOne({ nome, _id: { $ne: id } });
                
                if(temaComMesmoNome){
                    return response.json({
                        message: "Já existe um tema com este nome!",
                        type: "Conflict"
                    })
                }
            }

            // Preparar dados para atualização
            const data = {
                nome: nome || temaExiste.nome,
                descricao: descricao || temaExiste.descricao,
            }

            const tema = await Temas.findByIdAndUpdate(id, data, { new: true });

            return response.json({
                message: "Tema atualizado com sucesso!",
                value: tema
            })

        } catch (error) {
            return response.status(500).json({
                message:'Falha na atualização do tema',
                type: "Refused",
                error_detalhe:error,
            })
        }
    },

    async delete(request, response){
        
        const { id } = request.params;

        try{
            // Verificar se o tema existe
            const temaExiste = await Temas.findById(id);
            
            if(!temaExiste){
                return response.status(404).json({
                    message:'Tema não encontrado',
                    type: "Not Found",
                })
            }

            await Temas.findByIdAndDelete(id);

            return response.json({
                message: "Tema excluído com sucesso!",
                value: { id }
            })

        } catch (error) {
            return response.status(500).json({
                message:'Falha na exclusão do tema',
                type: "Refused",
                error_detalhe:error,
            })
        }
    }
}