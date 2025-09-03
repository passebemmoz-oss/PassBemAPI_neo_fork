const mongoose = require("mongoose");


const Provas = new mongoose.Schema({

    data: {
        type:Date,
        default: new Date()
    },
    tipo: String,
    numero:Number,
    tem_nome: String,
    resultado:{
        type:Number,
        default:0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    },
    tema_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tema",
    }
})

module.exports = mongoose.model("Provas", Provas);


