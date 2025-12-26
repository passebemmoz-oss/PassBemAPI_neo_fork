const mongoose = require("mongoose");


const dMaterialShema = new mongoose.Schema({
    name: String,
    pages: String,
    imagem: String,
    categoria: [
        String,
        String,
        String
    ],
    modulos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Modulo",
        }
    ],
},{
    toJSON:{
        virtuals:true,
    }
})

dMaterialShema.virtual(`link`).get(function(){
    return `http://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/files/${this.imagem}`
})

module.exports = mongoose.model("dMaterial", dMaterialShema);
