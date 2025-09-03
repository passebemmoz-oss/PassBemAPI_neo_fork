const cron = require('node-cron');
const Creditos = require('../models/Creditos');
const moment = require('moment')

async function SetUpdate(value, creditar){

    await Creditos.findOneAndUpdate(
        {user: value?.user},
        { $set:{
            atividade:creditar
        },
        },
        { useFindAndModify: false }
    );

    console.log("Atualizado :", creditar)
}

async function UpadateCredti(){

    const today = moment(new Date())

    const credit = await Creditos.find({ "atividade": { "$gte": 1 } })

    credit.forEach(value => {

        const inscricao = value?.inscricao;

        const result = moment.duration(today.diff(inscricao))

        const desconto = result.asDays();

        let creditar = 0

        switch(value?.pacote){
            case'Diario':
                creditar = 1 - Number(Math.ceil(desconto)) 
                break
            case'Semanal':
                creditar = 7 - Number(Math.ceil(desconto))
                break
            default:
                creditar = 30 - Number(Math.ceil(desconto))
                break
        }

        if(creditar < 0)creditar = 0;

        SetUpdate(value,creditar)
        
    })
    

}


module.exports =  cron.schedule('00 00 00 * * *', UpadateCredti,{
    scheduled:false,
})