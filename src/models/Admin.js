const mongoose = require("mongoose");


const UserShema = new mongoose.Schema({
    email: String,
    senha: String,
    admin: Boolean,

})

module.exports = mongoose.model("UserWeb", UserShema);


