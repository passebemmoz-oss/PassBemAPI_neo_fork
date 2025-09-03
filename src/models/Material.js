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
    return `https://api.passebem.co.mz/files/${this.imagem}`
})

module.exports = mongoose.model("dMaterial", dMaterialShema);
