const mongoose = require("mongoose");


const FormShema = new mongoose.Schema({
    formId: {
        type:String,
        unique: true
    },
    formInf:{
        type: Object,
        additionalProperties: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userTec:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FormUser",
    },

})

module.exports = mongoose.model("Form", FormShema);


