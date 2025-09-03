const UserInf = require('../../models/UserInf')

const UserApps = require('../../models/UserApp')

module.exports ={

    async create(request, response){


        let filename  = request.file?.filename;

        if(!filename){
            filename = 'perfil.jpeg'
        }
        
        const { 

            nome,
            provincia,
            distrito,
            telefone,
            email,
            idade,
            genero,
            categoria,
            escola,
            viatura,
            datacomprar,
            classecaro,
            notificacao,
            nivelacademico,
            
            
        } = request.body;

            

        const user = request.headers.authorization;

        
        //try{
            

            let users = await UserInf.findOne({telefone})

            if(!filename){
                filename = users?.imagem
            }

            let data = {
                nome,
                provincia,
                distrito,
                telefone,
                email,
                idade,
                genero,
                categoria,
                escola,
                viatura,
                datacomprar,
                classecaro,
                notificacao,
                user,
                nivelacademico,
                imagem: filename
            };

            if(users){


                console.log(data)

                users = await UserInf.findByIdAndUpdate(
                    users._id,
                    { $set:data},
                    { useFindAndModify: false }
                );
            } 

            else users = await UserInf.create(data)

            let userApp = await UserApps.findByIdAndUpdate(
                user,
                { $set:{user_inf:users._id}},
                { useFindAndModify: false }
            );

            const appUser = await UserApps.findById(user)
            
            await appUser.populate("user_inf").execPopulate()

            

            return response.json({messagem:'Perfil atualizado com sucesso!', appUser})
        /* }catch{
            return response.status(500).json({messagem:"Nao foi possivel gerar o perfil.  Tente novamente"})
        }  */





    },

    async getInf(req, res){

        const user = req.body?.user;

        try{

            const users = await UserInf.findOne({telefone:user})

            return res.json(users)
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