const Modulo = require("../../models/Modulo")
const VideoAula = require("../../models/VideoAula")
const Perguntas = require("../../models/Pergunta")


function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }



module.exports = {

    async indexOne(req, res, next){

        const {_id} = req.params;
        
        try{
            const videos = await VideoAula.find({modulo_id: _id})

            const perguntas = await Perguntas.find({partilhadas:_id})


            shuffle(perguntas)


            const data = {videos, perguntas}

            return res.json(data)

        }catch (error) {
        //This is forwarded to the global error handler. Do not change it.
            if(!error.statusCode) error.statusCode = 500
            next(error)         
        }

    },

    async index(req, res){
        

        try{
            const modulos = await Modulo.find({ "numero": { "$gte": 1 } })

        
        const videosaulas = await VideoAula.find({})
        
        const data = {modulos, videosaulas}

    

        return res.json({
            messagem:'Voce carregou os cursos com sucesso!',
            data
        })
        }catch{
            return res.status(401).json({messagem:"Nao foi possivel carregar os corsos.  Tente novamente"})
        }

        
    }
}