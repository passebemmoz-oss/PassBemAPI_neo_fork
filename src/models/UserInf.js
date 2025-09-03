const mongoose = require("mongoose");

const InfAppSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    provincia: String,
    distrito: String,
    telefone: String,
    email: String,
    idade: Number,
    genero: String,
    categoria: String,
    escola: String,
    viatura:  String,
    datacomprar: String,
    classecaro: String,
    notificacao: Boolean,
    nome: String,  
    nivelacademico: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    }
},{
    toJSON:{
        virtuals:true,
    }
})

InfAppSchema.virtual(`perfil_url`).get(function(){
    return `https://api.passebem.co.mz/files/${this.imagem}`
})

module.exports = mongoose.model("InfAppUser", InfAppSchema)

