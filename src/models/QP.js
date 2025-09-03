const mongoose = require("mongoose");


const QPShema = new mongoose.Schema({
    data: {
        type:Date,
        default: new Date()
    },
    tema: String,
    questao: String,
    descricao: String,
    votosim: {
        type:String,
        default: 0
    },
    votos: {
        type:String,
        default: 0
    },
    prof:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professores",
    }
},{
    toJSON:{
        virtuals:true,
    }
})

module.exports = mongoose.model("QP", QPShema);