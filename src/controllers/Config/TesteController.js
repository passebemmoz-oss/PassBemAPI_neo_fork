const axios = require("axios")
const Perguntas = require("../../models/Pergunta")

const fs = require('fs');


const api =axios.create({
    baseURL: "http://localhost:3333"
})


module.exports = {

    async perguntas(req, res){
        
        const pergunta = await Perguntas.find({}).populate("Tema")

        let fracasadas = [];

       await pergunta?.map( async (item, index) => {

            try{
                const response = await api.get(`/files/${item?.imagem}`)
                //console.log("sim")
            }catch{
                //console.log("nao")
                fracasadas.push({
                    "Questao":item?.questao,
                    "Tema": item?.tema,
                    "image": item?.imagem
                })

                let teste = item?.imagem.split(" ");
                teste = String(teste)
                teste = teste.replace(/,/g,"");


                //const Delete_Question = await Perguntas.deleteOne(item)

                //console.log(Delete_Question)

                const data = {
                    imagem :teste,
                };

                
                
            }

            if(index == pergunta?.length -1){

                return res.json(fracasadas)
            }

            
        })
        //return res.json(fracasadas)
        
    },


    async renoamer(req, res){


        
        // Especificaremos o arquivo a ser renomeado
        // e o novo nome
        
                
        fs.rename(file, 'main.png',function(err){
            if(err){
                console.log("Error while renaming file "+err);
            }
      });

    }
}