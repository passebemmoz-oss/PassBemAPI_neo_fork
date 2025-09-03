const { Expo } = require("expo-server-sdk");

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

const dbPushToken = require('../../models/Notifications');
const SaveNotifications = require("../../models/SaveNotifications");



module.exports.sendPushNotification = async (req, res) => {

    const title = req?.body?.title
    const message = req?.body?.message
    let listPushTokens = req?.body?.listPushTokens
    
    try{

        if(listPushTokens?.length < 1){

            listPushTokens = await dbPushToken.find({})
            
        }


        let notifications = [];
        for (let pushToken of listPushTokens) {
            if (!Expo.isExpoPushToken(pushToken?.pushToken || pushToken)) {
                // console.error(`Push token ${pushToken?.pushToken || pushToken} is not a valid Expo push token`);
                continue;
            }
        
            notifications.push({
                to: pushToken.pushToken || pushToken,
                sound: "default",
                title: title,
                body: message,
                data: { message }
            });
        }
    
        let chunks = expo.chunkPushNotifications(notifications);
    
        (async () => {
        for (let chunk of chunks) {
            try {
            let receipts = await expo.sendPushNotificationsAsync(chunk);
            // console.log(receipts);
            } catch (error) {
            // console.error(error);
            }
        }
        })();

        if(req.body?.status){

            return true
        }

        return res.json({
            error:false,
            message:'Notificações enviadas com sucesso'
        })

    }catch(err){
        if(req.body?.status){

            return false
        }
        // console.log('sendPushNotifications erro',err)
        return res.status(500).json({
            error: true,
            message:'Operação de envio de notificação falhou'
        })
    }
    
}

module.exports.GetUsersPush = async (req, res) => {

    try{
        const response = await dbPushToken.find({})

        return res.json({
            error:false,
            message:'Lista de UserToken',
            data:response,
        })
    }catch(err){
        console.log('Get All pushToken erro',err)
        return res.status(500).json({
            error: true,
            message:'Operação de busca de userTokens falhou'
        })
    }
}

module.exports.CreateHoistNotif = async(req, res) => {

    const title = req?.title
    const message = req?.message
    const numberListener = req?.numberListener
    // const numberReader = req?.numberReader

    const data = {
        title,
        message,
        numberListener,
    }

    try{
        await SaveNotifications.create(data)
        console.log('Histórico de notificações salvo com sucesso')
        return true
    }catch(err){
        console.log(err)
        console.log('Falha ao salver histórico de notificações')
        return false
    }
    
    
}



