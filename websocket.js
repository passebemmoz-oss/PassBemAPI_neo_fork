const soketio = require("socket.io");
let io;
var fs = require('fs');


exports.setupWebsocket = (server) => {
    io = soketio(server);

    

    io.on("connection", socket => {


        console.log("_________________")
    
        //console.log(socket.handshake.query);

        socket.on("midia", async image => {
            // image is an array of bytes
            const buffer = Buffer.from(image);
            await fs.writeFile('/tmp/image', buffer).catch(console.error);
            
        })

    });
  
}

exports.SendChat = (chats) =>{
    io.emit("chatall", chats)
};



