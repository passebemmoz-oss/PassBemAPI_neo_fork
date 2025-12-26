const Material = require('../../models/Material')

module.exports = {

    async index(req, res){
        
        try{

            const material = await Material.find({})
            
            

            return res.json({
                message:"Busca de Material realizada com sucesso!",
                value:material
            })

        }catch(error){

            return res.status(500).json({
                message:'Falha na busca de material didatico',
                type: "Refused",
                error_detalhe:error,
            })
        }
    },
    async indexOne(req, res){

        const categoria = req.params?.categoria;

        
        
        try{

            if(!categoria){
                return res.status(400).json({
                    message:'Busca de material didatico',
                    type: "Bad Request",
                    message_error:{"Categoria":`${categoria}`},
                })

            }

            const material = await Material.find({categoria:categoria})

            console.log(material)
            
            return res.json({
                message:"Busca de Material realizada com sucesso!",
                value:material
            })

        }catch(error){

            return res.status(500).json({
                message:'Falha na busca de material didatico',
                type: "Refused",
                error_detalhe:error,
            })
        } 


    },

    async create(req, res){
        
        const name = req.body?.nome;
        const pages = req.body?.pages;
        const imagem = req.file?.filename;
        const categoria = req.body?.categoria;
        const modulos = req.body?.modulos;

        try{
            const data = {
                "name" : name,
                "pages" : pages,
                'imagem' : imagem,
                "categoria" : categoria.split(",").map(opcao => opcao.trim()),
                "modulos" : modulos.split(",").map(opcao => opcao.trim()),
            }


            if(!name || !pages || !imagem || !categoria){

                return res.status(400).json({
                    message:'Cadastro de material didatico',
                    type: "Bad Request",
                    message_error:{data},
                })

            }

            const material = await Material.create(data)

            return res.json({
                message:"Material de Cadastro registado com sucesso!",
                value:material
            })
            

        }catch(error){

            return res.status(500).json({
                message:'Falha no cadastro de material didatico',
                type: "Refused",
                error_detalhe:error,
            })
        }  
    },

    async update(req, res){
        
        const { id } = req.params;
        const name = req.body?.nome;
        const pages = req.body?.pages;
        const imagem = req.file?.filename;
        const categoria = req.body?.categoria;
        const modulos = req.body?.modulos;

        try{
            // Verificar se o material existe
            const materialExiste = await Material.findById(id);
            
            if(!materialExiste){
                return res.status(404).json({
                    message:'Material não encontrado',
                    type: "Not Found",
                })
            }

            // Preparar dados para atualização
            const data = {
                "name" : name || materialExiste.name,
                "pages" : pages || materialExiste.pages,
                "imagem" : imagem || materialExiste.imagem,
                "categoria" : categoria ? categoria.split(",").map(opcao => opcao.trim()) : materialExiste.categoria,
                "modulos" : modulos ? modulos.split(",").map(opcao => opcao.trim()) : materialExiste.modulos,
            }

            const material = await Material.findByIdAndUpdate(id, data, { new: true });

            return res.json({
                message:"Material atualizado com sucesso!",
                value:material
            })

        }catch(error){

            return res.status(500).json({
                message:'Falha na atualização de material didatico',
                type: "Refused",
                error_detalhe:error,
            })
        }  
    },

    async delete(req, res){
        
        const { id } = req.params;

        try{
            // Verificar se o material existe
            const materialExiste = await Material.findById(id);
            
            if(!materialExiste){
                return res.status(404).json({
                    message:'Material não encontrado',
                    type: "Not Found",
                })
            }

            await Material.findByIdAndDelete(id);

            return res.json({
                message:"Material excluído com sucesso!",
                value: { id }
            })

        }catch(error){

            return res.status(500).json({
                message:'Falha na exclusão de material didatico',
                type: "Refused",
                error_detalhe:error,
            })
        }  
    },
}
