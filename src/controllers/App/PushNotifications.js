const dbPushToken = require('../../models/Notifications')
const UserApp = require('../../models/UserApp')

module.exports.recive = async(req, res) => {

    const pushToken = req.body?.pushToken
    const phoneNumber = req.body?.phoneNumber

    const user = req.headers.authorization

    
    

    try{

        const users = await UserApp.findById(user)

        const data = {
            pushToken,
            phoneNumber:users?.numero,
        }
        

        const response = await dbPushToken.findOne({phoneNumber:users?.numero})

        if(response){
            await dbPushToken.findByIdAndUpdate(
                response._id,
                { $set:{
                    pushToken: pushToken
                }},
                { useFindAndModify: false, new:true }
            
            )

            return res.json({
                error:false,
                message:'Token de notificação atualizado com sucesso'
            })
        }

        await dbPushToken.create(data)

        return res.json({
            error:false,
            message:'Token de notificação criado com sucesso'
        })
    }catch(err){
        console.log('notification error :',err)

        return res.status(500).json({
            error: true,
            message:'Operação do token de notificação falhou'
        })
    }
}
