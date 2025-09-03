const VideoAula = require("../../models/VideoAula");
const Modulos = require("../../models/Modulo");
const Admin = require("../../models/Admin");

module.exports = {

    async index(req, res){
        const {modulo_id} = req.headers;


        const videos = await VideoAula.find({modulo_id : modulo_id})

        return res.json(videos)

    },

    async create(request, response){
        
        const {modulo,  titulo, descricao} = request.body;



        const {filename } = request.file;

        const {modulo_id} = request.headers;

        
        try{
            const modulos = await Modulos.findById(modulo_id)

            if(!modulos){
                return response.status(400).json({error : "Nenhum tema registado com este ID"})
            }

            const data = {
                modulo, 
                titulo, 
                descricao, 
                imagem :filename , 
                modulo_id,
            };

            let videoaula = await VideoAula.findOne({titulo})

            if(!videoaula){
                videoaula = await VideoAula.create(data)

                const Update = await Modulos.updateOne({_id:modulo_id},{"$inc":{numero:1}})
                return response.json("Seu vídeo foi criado com sucesso!")
            }

            await videoaula.populate("modulo_id").execPopulate()

            return response.json("Você já tem um vídeo com o mesmo nome.Você já tem um vídeo com o mesmo nome.")

        }catch(err){return response.json("Nao foi possivel criar a video aula")}
    },

    async delete(request, response){

        const id = request?.headers?.authorization

 
        try{

            const admin = await Admin.findById(id)

            if(admin?.admin == true){

                const modulo_id = request.headers?.moduloid;

                const {_id} = request.params;

                const videoAula = await VideoAula.deleteOne({_id,modulo_id})


                if(!videoAula){
                    return response.json("Não foi possível apagar esta vídeo aula!")
                }
                const Update = await Modulos.updateOne({_id:modulo_id},{"$inc":{numero:-1}})

                return response.json("Vídeo aula  apagada com sucesso!")
            }

            return response.status(401).json("Operation not permit")
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
