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
    return `http://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/files/${this.imagem}`
})

module.exports = mongoose.model("VideoAula", VideoAulaShema);