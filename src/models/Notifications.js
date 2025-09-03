const mongoose = require("mongoose");


const PushTokensShema = new mongoose.Schema({

    phoneNumber:{
        type: Number,
        required: true
    },
    pushToken:{
        type: String,
        required: true
    }
   
    
},{
    timestamps:  true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true
    }
})


module.exports = mongoose.model("PushTokens", PushTokensShema);

