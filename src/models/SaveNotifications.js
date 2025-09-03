const mongoose = require("mongoose");


const SaveNotifShema = new mongoose.Schema({

    title:{
        type: Number,
        required: true
    },
    message:{
        type: Number,
        required: true
    },
    numberListener:{
        type: Number,
        required: true
    },
    numberReader:{
        type: Number,
        required: true,
        default: 0,
    },
    groupListener:[
        {
            phoneNumber: {
                type: Number,
                required:true
            },
            pushToken: {
                type: String,
                required:false
            },
        }
    ],
    groupReader:[
        {
            phoneNumber: {
                type: Number,
                required:false
            },
            pushToken: {
                type: String,
                required:false
            },
        }
    ]
   
},{
    timestamps:  true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true
    }
})


module.exports = mongoose.model("SaveNotif", SaveNotifShema);




