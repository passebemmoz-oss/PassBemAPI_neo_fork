const mongoose = require("mongoose");


const ConviteShema = new mongoose.Schema({
    tableName: String,
    active: {type:Number, default:0},
    hash: String,
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Convite", ConviteShema);


