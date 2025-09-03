const mongoose = require("mongoose")

const FormUser = new mongoose.Schema({
    numero: {
        type:Number,
        required: true,
    },
    senha: {
        type:String,
        required: true,
    },
    userName:{
        type:String,
        required: true,
    }
}, {
    timestamps:  true,
    toJSON: {
        transform(doc, obj){
            obj.id = obj._id
            // delete obj.senha
            delete obj.createdAt
            delete obj.updatedAt        
        }
    }
})

module.exports= mongoose.model("FormUser", FormUser);