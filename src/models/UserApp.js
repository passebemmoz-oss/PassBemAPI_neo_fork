const mongoose = require("mongoose")

const AppUser = new mongoose.Schema({
    numero: {
        type:Number,
        required: true,
    },
    senha: {
        type:String,
        required: true,
    },
    user_inf:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "InfAppUser",
    }
}, {
    timestamps:  true,
    toJSON: {
        transform(doc, obj){
            obj.id = obj._id
            delete obj.senha
            delete obj.createdAt
            delete obj.updatedAt        
        }
    }
})

module.exports= mongoose.model("AppUser", AppUser);