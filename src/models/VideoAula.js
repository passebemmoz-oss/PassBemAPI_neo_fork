const mongoose = require("mongoose");


const VideoAulaShema = new mongoose.Schema({
    modulo: String,
    titulo: String,
    descricao: String,
    imagem: String,
    modulo_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modulo",
    }
},{
    toJSON:{
        virtuals:true,
    }
})

VideoAulaShema.virtual(`video_url`).get(function(){
    return `https://api.passebem.co.mz/files/${this.imagem}`
})

module.exports = mongoose.model("VideoAula", VideoAulaShema);