const ChatModel = require('../../models/Chat')

const UserApp = require('../../models/UserApp')

const {SendChat} = require('../../../websocket');
const { sendPushNotification } = require('../Web/Sendnotifications');



module.exports = {


    async index(req, res){
        const {authorization} = req.headers;


        
        try{
            const user = await UserApp.findById(authorization)


            if(!user) return res.status(401).json({message:'Operation not permited'})


            const Chats = await ChatModel.find({}).sort({$natural: -1 }).limit(15)
                .populate('user')

            SendChat(Chats.reverse())

            return res.json(Chats)
        }catch{
            return res.status(401).json('Operation not permit')
        }
    },

    
    async createText(req, res){

        const {text, name, avatar} = req.body;
        const user = req.headers?.authorization;

        if(!user){
            return res.status(401).json({message:"Not permit"})
        }


        try{
            const data = {text, "user._id":user, "user.name":name, "user.avatar":avatar};

            let chats = await ChatModel.create(data)


            if(chats){
                chats = await ChatModel.find({})
                    .populate('user')
            }

            SendChat(chats.reverse())

            req.body.message = text
            req.body.title = 'Bate-Papo'
            req.body.status = true
            req.body.listPushTokens = []
            
            sendPushNotification(req, res)

            return res.status(200).json('created')
        }catch{
            return res.status(401).json('Operation not permit')
        }

    },

    async createIMGE(req, res){

        const { name, avatar} = req.body;
        
        
        const user = req.headers.authorization;

        const image_name  = req.file.filename;



        
        try{
            const data = { "user._id":user, "user.name":name, "user.avatar":avatar, image_name}

            let chats = await ChatModel.create(data)

            if(chats){
                chats = await ChatModel.find({})
                    .populate('user')
            }

            SendChat(chats.reverse())

            return res.status(200).json('created')
        }catch{
            return res.status(401).json('Operation not permit')
        }
    },

    async createVideo(req, res){

        const { name, avatar} = req.body;
        
        const user = req.headers.authorization;

        const video_name  = req.file.filename;



        try{
            const data = { "user._id":user, "user.name":name, "user.avatar":avatar, video_name}

            let chats = await ChatModel.create(data)

            if(chats){
                chats = await ChatModel.find({})
                    .populate('user')
            }

            SendChat(chats.reverse())

            return res.status(200).json('created')
        }catch{
            return res.status(401).json('Operation not permit')
        }
    },

    
}