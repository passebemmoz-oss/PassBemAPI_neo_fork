const mongoose = require("mongoose");


const HistCreditosShema = new mongoose.Schema({
    inscricao: {
        type:Date,
        default: new Date
    },
    pacote: String,
    status: Boolean,
    valor: Number,
    credito_card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creditos",
    },
    transactionreference: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserWeb",
    },
    authorName: String
})

module.exports = mongoose.model("HistCreditos", HistCreditosShema);


