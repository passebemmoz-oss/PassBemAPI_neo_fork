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
    return `http://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/files/${this.imagem}`
})

module.exports = mongoose.model("Anucios", AnuciosShema);


