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
    return `http://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/files/${this.imagem}`
})

module.exports = mongoose.model("InfAppUser", InfAppSchema)

