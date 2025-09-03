const mongoose = require("mongoose");

const EscolasSchema = new mongoose.Schema({
    nome: String,
    provincia: String,
    distrito: String,
    lat: String,
    long: String,
    telefone: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserWeb",
    } 
})

module.exports = mongoose.model("EscolasPassBem", EscolasSchema);