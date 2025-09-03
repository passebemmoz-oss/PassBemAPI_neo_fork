const multer = require("multer");
const path = require("path");


module.exports={
    storage : multer.diskStorage({
        
        destination: path.resolve(__dirname, "..","..","uploads"),
        filename:(req, file, cb) =>{

            let teste = file.originalname.split(" ")
            teste = String(teste)
            teste = teste.replace(/,/g,"")

            const ext = path.extname(file.originalname);
            const name = path.basename(teste, ext);
            cb(null, `${name}-${Date.now()}${ext}`)
            
        }
    })
}