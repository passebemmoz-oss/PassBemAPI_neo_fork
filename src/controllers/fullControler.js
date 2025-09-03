
const  Convite = require('../models/Invet')


module.exports = {

    async indexall(req, res, next){

        const {hash} = req.body
        
        try{

            const list = await  Convite.find({
            })


            return res.json({
                value:list,
                message:"sucesso!"
            })
            

        }catch (error) {
        //This is forwarded to the global error handler. Do not change it.
            if(!error.statusCode) error.statusCode = 500
            next(error)         
        }

    },

    async UpdateStatus(req, res, next){

        const {id, number} = req.body
        
        try{

            const list = await Convite.updateOne({_id : id},
                {
                "$inc": {
                    active: + number,
                },
                }
            );


            return res.json({
                value:list,
                message:"sucesso!"
            })
            

        }catch (error) {
        //This is forwarded to the global error handler. Do not change it.
            if(!error.statusCode) error.statusCode = 500
            next(error)         
        }

    },

    async CreateConvite(req, res, next){

        const {hash, tableName} = req.body

        const data = {
            tableName: tableName,
            hash:hash,
        }
        
        try{

            const list = await Convite.create(data)


            return res.json({
                value:list,
                message:"sucesso!"
            })
            

        }catch (error) {
        //This is forwarded to the global error handler. Do not change it.
            if(!error.statusCode) error.statusCode = 500
            next(error)         
        }

    },

}


