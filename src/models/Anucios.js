const mongoose = require("mongoose");


const AnuciosShema = new mongoose.Schema({
    nome: String,
    link: String,
    empresa: String,
    active: Boolean,
    imagem:String,
    createdAt: {
        type:Date,
        default: new Date()
    },
    validade: Date,
    contacto: String,

    
},{
    toJSON:{
        virtuals:true,
    }
})

AnuciosShema.virtual(`imagem_url`).get(function(){
    return `https://api.passebem.co.mz/files/${this.imagem}`
})

module.exports = mongoose.model("Anucios", AnuciosShema);


