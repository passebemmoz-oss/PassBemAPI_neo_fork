const crypto  = require("crypto");
const {PythonShell} = require ('python-shell');
const Creditos = require('../../models/Creditos')
const HistCreditos = require('../../models/HistoricoCreditos')

const UserApp = require('../../models/UserApp')

const axios = require("axios")

const api =axios.create({
    baseURL: "https://api.vm.co.mz:18346"
})



module.exports = {

    async indexOne(req, res){

        const user = req.headers.authorization

        try{
            const creditos = await Creditos.findOne({user: user})

            return res.json({
                status: '200 ok',
                message: '',
                value: creditos
            })
        }
        catch{ return res.status(400).json({message:"any error on server"})}
    },

    async GetHistory(req, res){

        const user = req.headers.authorization

        try{
            const histCreditos = await HistCreditos.find({user: user})


            return res.json({
                status: '200 ok',
                message: '',
                value: histCreditos
            })
        }
        catch{ return res.status(400).json({message:"any error on server"})}

    },
    
    async create(req, res){

        let Emergecy = true

        const TransactionReference = crypto.randomBytes(3).toString("HEX");

        const user = req.headers.authorization

        const pacote = req.body?.pacote;
        const numero = req.body?.numero

        let custo;
        let atividade;

        
        switch(pacote) {
            case "Diario":
              custo = 28
              atividade = 1
              break;
            case "Semanal":
              custo = 70
              atividade = 7
              break;
            default:
              custo = 110
              atividade = 30
        }         

        const users = await UserApp.findById(user)


        let number = `258${numero || users?.numero}`

        JSON.stringify(number)
        JSON.stringify(custo)


        const data = {
            "input_TransactionReference": `${TransactionReference}`,
            "input_CustomerMSISDN": number,
            "input_Amount": custo,
            "input_ThirdPartyReference": `Plano ${pacote}, Codigo de referencia 900215`,
            "input_ServiceProviderCode": "900215"
        }
        
        api.post("/ipg/v1/c2bpayment/",data,{
            headers:{
                Authorization: 'Bearer JH84K+B9Cjypxd6N7Ax8oJgA7Bv84fFL/u1dxi/PSW+UAxtiuqEUMIYus3Eh5RwI5FJdxNUmd5EdOn+B66ZBzJ3bOhjr/CH+7OHZbiRNP9L4DTR7HPZGTTBPlk9Q2hZz77Ozr8PKlEdp2071fb7J9fX2/I9dCgBj4Y6bf1oN/1DKxg28GS6WJnRmNsWrj/yaJE3Up8Dn6NN2kP5fcJwImJWK4nU0PPgnIf5q+2ybIec+lQXhlivxe4XmTx8o5Law7EDBHqxjVyIPVIKb2tHtXrO7HIguCreZHxySLyT0L8jcTOPZQtLnl4jGUAbn6vyQi2AVDjGYAgtXKfYNXgZ+9MnTM8zc6kk/Twnmg9BlIsZgpjaMRVGvBaS62zBQd059d1BvzY+f8g1P81MigXrIopvb2b097dplwZx1PM3Q4jQgUo/F/u8JfGJk6QzwzU6GGhTecOgUIy3w5Tz1LoGq6CqguT51LHCU0zsyKu4PilZqSMgu8dcl50XrkK4oLo5OYanUOKR6ipmPZAo0bphVktsgnX/E5bSKr6m1l30smHolKeUYsQVtzYrvgK8V85d4/+rmkObLqBhcwbKkwgm0HbWt49vWvw143pMfmQhoCDGO+HeDbTiwndJEvwJaihifRsZh3dg6a3+6Myn3BvM//KwJPckbfZom+XCkRcjJcXk=',
                Origin:"api.sandbox.vm.co.mz"// "developer.mpesa.vm.co.mz"
            }
        })
        // handle success
        .then(async function(response){

            
            let creditos = await Creditos.findOneAndUpdate(
                {user: user},
                { $set:{
                    pacote:pacote,
                    inscricao: new Date()
                },
                    "$inc": {
                        atividade: atividade,
                    },
                },
                { useFindAndModify: false }
            );

            if(!creditos) creditos = await Creditos.create({
                user:user,
                pacote:pacote,
                atividade:atividade,
                inscricao: new Date(),
            })

            await HistCreditos.create({
                pacote: pacote,
                status: true,
                valor:  custo,
                credito_card: creditos._id,
                user:user,
                transactionreference:TransactionReference,
                inscricao:new Date(),
            })
    
            creditos = await Creditos.findOne({user: user})

            Emergecy =false


            return res.json({
                status:'200 ok',
                message:`Parabéns você tem mais ${atividade} dias para estudar sem limites `,
                atividade:creditos.creditos
            })

            
        })
        // handle error
        .catch(async function(error){

            console.log('vodacom response', error)

            Emergecy =false


            const creditos = await Creditos.findOne({user: user})

            const hist = await HistCreditos.create({
                pacote: `${pacote} Erro: ${error?.response?.data?.output_ResponseDesc}`,
                status: false,
                valor:  custo,
                credito_card: creditos._id,
                user:user,
                transactionreference:TransactionReference,
                inscricao:new Date(),
            })



            console.log(error.response.data.output_ResponseDesc)

            return res.status(409).json(`${error?.response?.data?.output_ResponseDesc} Status: ${error.response.status}`)
        })

        
    },

    async ManualCredi (req, res){
        

        const pacote = req.body?.pacote;
        const numero = req.body?.numero


        const TransactionReference = crypto.randomBytes(2).toString("HEX");

        console.log()
        let custo;
        let atividade;

        
        switch(pacote) {
            case "Diario":
              custo = 28
              atividade = 1
              break;
            case "Semanal":
              custo = 70
              atividade = 7
              break;
            default:
              custo = 215
              atividade = 30
        }

        try{
            const users = await UserApp.findOne({
                numero: numero
            })
    
            let creditos = await Creditos.findOneAndUpdate(
                {user: users},
                { $set:{
                    pacote:pacote,
                    inscricao: new Date()
                },
                    "$inc": {
                        atividade: atividade,
                    },
                },
                { useFindAndModify: false }
            );
    
            if(!creditos) creditos = await Creditos.create({
                user:users,
                pacote:pacote,
                atividade:atividade,
                inscricao: new Date(),
            })
    
            await HistCreditos.create({
                pacote: pacote,
                status: true,
                valor:  custo,
                credito_card: creditos._id,
                user:users,
                transactionreference:TransactionReference,
                inscricao:new Date(),
                author:req.body?.id,
                authorName:req.body?.name
            })
    
            creditos = await Creditos.findOne({user: users})
    
            Emergecy =false
    
            return res.json({
                status:'200 ok',
                message:`Parabéns você tem mais ${atividade} dias para estudar sem limites `,
                // atividade:creditos.creditos
            })
        }catch(err){
            console.log(err)

            return res.status(500).json({
                message:`Erro no servidor`,
            })
        }
    }
}



/* const data = {
    "input_TransactionReference": "T12344C",
    "input_CustomerMSISDN": "258845202445",
    "input_Amount": "10",
    "input_ThirdPartyReference": "Iphonr",
    "input_ServiceProviderCode": "171717"
}

api.post("/ipg/v1x/c2bPayment/singleStage/",data,{
    headers:{
        Authorization: "Bearer j486UU8sjiP25PUpBAL88lkDPDaVuqNkd5lAcvfcBQ+0bxNF9UzcSn7q/mDYaSnnvuW2Go7jOiaETGAzKmumNhbKF5lVK4j+q+3LbCPWm6+jFnU53aPYvgfytTcYW0CWOE4LnBL177QSY5Y68FKA4UAGQ7xlBEXouo19XkyfFODI3vF8S3SxoDQ935zrbgMU7F8pdzYItLeBbxSvFqBEUoiyNk4sFJ0SKc3NAQxJi45KkHoB24HRgX+/f2VowFPkewTaxLm5WwLGd/xp8aUNkNSOSSo0l1VbfczJ+dgJdodPQdaIW/5JeICSOe/oTamuHhH1WSnDSSQ5pVc7OonLKUXQ+/gB/Awv8+Zbi00LXUf34KAPTYlzRZimP08N8CfjtehtQNM1IeY6/WKPVzy6F/6wvGoHkN2CEXJNramFtibdMFZCIC7tuXho3hoxNfbH6iJ1Pech9TaGvDUJab3PkwWOTIzpl9z77N4am44hwuD/WFBlxZcmtboRDconP98A51AsSCrFdlrvU036OhqB0tpRTXzOxu/k33ls1S7VnxrEitoGB2Yfii6AFumzjdoeJhGoWyn+pW+rWqypARY8VOFNOIxeOPAf9ItIVY9NujZvmEYPmp9+pneqR0IuKNxH6JSot1N5aV+CUNrVK64nP7K6KCq+lW6LfZflf8ybcAw=",
        Origin: "developer.mpesa.vm.co.mz"
    }
})
// handle success
.then(function(response){
   
})
// handle error
.catch(function(error){
    return(`${error.response.statusText} Status: ${error.response.status}`)
}) */



// MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyrOP7fgXIJgJyp6nP/Vtlu8kW94Qu+gJjfMaTNOSd/mQJChqXiMWsZPH8uOoZGeR/9m7Y8vAU83D96usXUaKoDYiVmxoMBkfmw8DJAtHHt/8LWDdoAS/kpXyZJ5dt19Pv+rTApcjg7AoGczT+yIU7xp4Ku23EqQz70V5Rud+Qgerf6So28Pt3qZ9hxgUA6lgF7OjoYOIAKPqg07pHp2eOp4P6oQW8oXsS+cQkaPVo3nM1f+fctFGQtgLJ0y5VG61ZiWWWFMOjYFkBSbNOyJpQVcMKPcfdDRKq+9r5DFLtFGztPYIAovBm3a1Q6XYDkGYZWtnD8mDJxgEiHWCzog0wZqJtfNREnLf1g2ZOanTDcrEFzsnP2MQwIatV8M6q/fYrh5WejlNm4ujnKUVbnPMYH0wcbXQifSDhg2jcnRLHh9CF9iabkxAzjbYkaG1qa4zG+bCidLCRe0cEQvt0+/lQ40yESvpWF60omTy1dLSd10gl2//0v4IMjLMn9tgxhPp9c+C2Aw7x2Yjx3GquSYhU6IL41lrURwDuCQpg3F30QwIHgy1D8xIfQzno3XywiiUvoq4YfCkN9WiyKz0btD6ZX02RRK6DrXTFefeKjWf0RHREHlfwkhesZ4X168Lxe9iCWjP2d0xUB+lr10835ZUpYYIr4Gon9NTjkoOGwFyS5ECAwEAAQ==



/* buildTypes {
     release { 
         debuggable false minifyEnabled true proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro' 
         buildConfigField "String", 
         'MPESA_PUBLIC_KEY', '"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyrOP7fgXIJgJyp6nP/Vtlu8kW94Qu+gJjfMaTNOSd/mQJChqXiMWsZPH8uOoZGeR/9m7Y8vAU83D96usXUaKoDYiVmxoMBkfmw8DJAtHHt/8LWDdoAS/kpXyZJ5dt19Pv+rTApcjg7AoGczT+yIU7xp4Ku23EqQz70V5Rud+Qgerf6So28Pt3qZ9hxgUA6lgF7OjoYOIAKPqg07pHp2eOp4P6oQW8oXsS+cQkaPVo3nM1f+fctFGQtgLJ0y5VG61ZiWWWFMOjYFkBSbNOyJpQVcMKPcfdDRKq+9r5DFLtFGztPYIAovBm3a1Q6XYDkGYZWtnD8mDJxgEiHWCzog0wZqJtfNREnLf1g2ZOanTDcrEFzsnP2MQwIatV8M6q/fYrh5WejlNm4ujnKUVbnPMYH0wcbXQifSDhg2jcnRLHh9CF9iabkxAzjbYkaG1qa4zG+bCidLCRe0cEQvt0+/lQ40yESvpWF60omTy1dLSd10gl2//0v4IMjLMn9tgxhPp9c+C2Aw7x2Yjx3GquSYhU6IL41lrURwDuCQpg3F30QwIHgy1D8xIfQzno3XywiiUvoq4YfCkN9WiyKz0btD6ZX02RRK6DrXTFefeKjWf0RHREHlfwkhesZ4X168Lxe9iCWjP2d0xUB+lr10835ZUpYYIr4Gon9NTjkoOGwFyS5ECAwEAAQ=="' 
         buildConfigField "String", 
         'MPESA_API_KEY', '"2csvufqc4vnqboayrclkt0acr8zvd8tw"' 
         buildConfigField "String", 'MPESA_SERVER', '"https://api.vm.co.mz:18346"' 
         buildConfigField "String", 'MPESA_ENDPOINT', '"/ipg/v1/c2bpayment/"' } */