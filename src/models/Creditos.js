const mongoose = require("mongoose");


const CreditosShema = new mongoose.Schema({
    inscricao: Date,
    pacote: String,
    atividade: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserWeb",
    }
})

module.exports = mongoose.model("Creditos", CreditosShema);


