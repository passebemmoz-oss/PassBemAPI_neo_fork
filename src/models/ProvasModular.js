const mongoose = require("mongoose");


const ProvasModular = new mongoose.Schema({

    data: {
        type:Date,
        default: new Date()
    },
    numero:Number,
    modulo_nome: String,
    resultado:{
        type:Number,
        default:0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AppUser",
    },
    modulo_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modulo",
    }
})

module.exports = mongoose.model("ProvasModular", ProvasModular);


