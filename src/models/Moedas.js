const mongoose = require("mongoose")

const Moedas = new mongoose.Schema({
    pacote: {
        type:String,
        required: true,
    },
    moedas:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
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
            delete obj.createdAt
            delete obj.updatedAt        
        }
    }
})

module.exports= mongoose.model("Moedas", Moedas);