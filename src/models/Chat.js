const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    createdAt: {
        type:Date,
        default: new Date
    },
    image_name: {
        type:String,
        default:null
    },
    video_name: {
        type:String,
        default:null
    },
    text:String,
    sent: {
        type:Boolean,
        default:true
    },
    received: {
        type:Boolean,
        default:true
    },

    user:{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppUser",
        },
        name:{
            type: String,
            default: "AppUser",
        },
        avatar:{
            type: String,
            default: "https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg",
        },
    } 
},{
    toJSON:{
        virtuals:true,
    }
})

ChatSchema.virtual(`image`).get(function(){
    if(this.image_name){
        return `https://api.passebem.co.mz/files/${this.image_name}`
    }
    
})

ChatSchema.virtual(`video`).get(function(){
    if(this.video_name){
        return `https://api.passebem.co.mz/files/${this.video_name}`
    }
    
})

module.exports = mongoose.model("ChatPassBem", ChatSchema);