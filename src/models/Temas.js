const mongoose = require("mongoose");


const TemaShema = new mongoose.Schema({
    nome: String,
    descricao: String,
    numero: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserWeb",
    }
})

module.exports = mongoose.model("Tema", TemaShema);


