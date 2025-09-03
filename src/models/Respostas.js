const mongoose = require("mongoose");


const Respostas = new mongoose.Schema({

    data: {
        type:String,
        default: new Date()
    },
    resposta: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    },
    prova:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provas",
    },
    questao:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pergunta",
    }
    
})

module.exports = mongoose.model("Respostas", Respostas);


