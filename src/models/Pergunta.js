const mongoose = require("mongoose");


const PerguntaShema = new mongoose.Schema({
    tema: String,
    questao: String,
    alternativa_correta: String,
    imagem: String,
    incorecta_alternativas: [
        String,
        String,
        String
    ],
    partilhadas:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Modulo",
        }
    ],
    tema_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tema",
    }
},{
    toJSON:{
        virtuals:true,
    }
})

PerguntaShema.virtual(`imagem_url`).get(function(){
    return `http://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/files/${this.imagem}`
})

module.exports = mongoose.model("Pergunta", PerguntaShema);
