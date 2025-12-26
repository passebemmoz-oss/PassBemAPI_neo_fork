const mongoose = require("mongoose");


const ProfessorSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    imagem: String,
    escola_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"EscolasPassBem"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserWeb"
    }

},{
    toJSON:{
        virtuals:true,
    }
})

ProfessorSchema.virtual(`prof_url`).get(function(){
    return `http://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/files/${this.imagem}`
})
module.exports = mongoose.model("Professores", ProfessorSchema)