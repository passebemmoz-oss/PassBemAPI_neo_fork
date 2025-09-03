
const  Form = require('../models/Form')
const TecFrom  = require('../models/FormUser')


module.exports = {

    async indexall(req, res, next){

        const {hash} = req.body
        
        try{

            const list = await  Form.find({
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

            const list = await Form.updateOne({_id : id},
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

    async CreateForm(req, res, next){
        
        console.log('start create form SubmiteForm()')
        try{
          
          const CheckId = await Form.find({
            formId:req.body?.formId
          }) 

          if(CheckId.length > 0){

            

            return res.json({
              message:"sucesso!"
            })
          }

            const list = await Form.create(req.body)


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

    async CreateTec (req, res, next){
        
        console.log('start create form SubmiteForm()')
        try{

            const list = await TecFrom.create(req.body)


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


    async getTec (req, res, next){
        
        try{

            const list = await TecFrom.find({})


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

    async  getAggregatedData(req, res, next) {
        try {

          
            
            
            const socialInf = await Form.aggregate([
  // Desconstrua o array socialInf para processar cada item separadamente
  { $unwind: "$formInf.socialInf" },
  
  // Agrupe por título do campo (por exemplo, "Gênero") e colete as respostas
  {
    $group: {
      _id: "$formInf.socialInf.title",
      responses: { 
        $push: "$formInf.socialInf.response" 
      }
    }
  },
  
  // Adicione o total de respostas
  {
    $addFields: {
      totalResponses: { $size: "$responses" }
    }
  },
  
  // Desconstrua o array de respostas para contar cada resposta individualmente
  { $unwind: "$responses" },
  
  // Filtre respostas vazias (como strings vazias, null, ou apenas espaços)
  {
    $match: {
      responses: {
        $nin: ["", null, " "] // Exclui strings vazias, null e strings contendo apenas espaços
      }
    }
  },
  
  // Agrupe por título e resposta para contar a quantidade de cada resposta
  {
    $group: {
      _id: { title: "$_id", response: "$responses" },
      pessoas: { $sum: 1 },
      totalResponses: { $first: "$totalResponses" }
    }
  },
  
  // Agrupe por título e prepare a estrutura final
  {
    $group: {
      _id: "$_id.title",
      responses: {
        $push: {
          response: "$_id.response",
          pessoas: "$pessoas",
          percentagem: {
            $concat: [
              {
                $toString: {
                  $multiply: [
                    { $divide: ["$pessoas", "$totalResponses"] },
                    100
                  ]
                }
              },
              "%"
            ]
          }
        }
      }
    }
  },
  
  // Ordenar os resultados pelo título (title) em ordem crescente
  {
    $sort: { _id: 1 } // Ordena os títulos (campo _id) em ordem alfabética crescente
  },
  
  // Ordena as respostas dentro de cada título por resposta
  {
    $addFields: {
      responses: {
        $sortArray: {
          input: "$responses",
          sortBy: { response: 1 } // Ordena as respostas em ordem alfabética crescente
        }
      }
    }
  },
  
  // Formate o resultado final
  {
    $project: {
      _id: 0,
      title: "$_id",
      responses: 1
    }
  }
            ]);


            const healthInf = await Form.aggregate([
                // Desconstrua o array healthInf para processar cada item separadamente
                { $unwind: "$formInf.healthInf" },
                
                // Assegure-se de que `response` seja um array e desconstrua se necessário
                {
                  $addFields: {
                    "formInf.healthInf.response": {
                      $cond: {
                        if: { $isArray: "$formInf.healthInf.response" },
                        then: "$formInf.healthInf.response",
                        else: [ "$formInf.healthInf.response" ] // Se não for array, coloque-o dentro de um array
                      }
                    }
                  }
                },
                
                // Desconstrua o array response se for um array de respostas
                { $unwind: { path: "$formInf.healthInf.response", preserveNullAndEmptyArrays: true } },
                {
                  $match: {
                    "formInf.healthInf.response": {
                      $nin: ["", null, [], " "] // Exclui strings vazias, null, arrays vazios e strings contendo apenas espaços
                    }
                  }
                },
                
                
                // Agrupe por título e resposta para contar a quantidade de cada resposta
                {
                  $group: {
                    _id: { title: "$formInf.healthInf.title", response: "$formInf.healthInf.response" },
                    pessoas: { $sum: 1 }
                  }
                },

                {
                  $sort: { _id: 1 } // 1 para crescente, -1 para decrescente
                },
                
                // Contar o total de respostas para cada título
                {
                  $group: {
                    _id: "$_id.title",
                    responses: {
                      $push: {
                        response: "$_id.response",
                        pessoas: "$pessoas"
                      }
                    },
                    totalResponses: { $sum: "$pessoas" }
                  }
                },
                
                // Calcule a porcentagem com base no total de respostas
                {
                  $addFields: {
                    responses: {
                      $map: {
                        input: "$responses",
                        as: "resp",
                        in: {
                          response: "$$resp.response",
                          pessoas: "$$resp.pessoas",
                          percentagem: {
                            $concat: [
                              {
                                $toString: {
                                  $multiply: [
                                    { $divide: ["$$resp.pessoas", "$totalResponses"] },
                                    100
                                  ]
                                }
                              },
                              "%"
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                
                // Formate o resultado final
                {
                  $project: {
                    _id: 0,
                    title: "$_id",
                    responses: 1
                  }
                }
            ]);

            const weddingsInf = await Form.aggregate([
                // Desconstrua o array weddingsInf para processar cada item separadamente
                { $unwind: "$formInf.weddingsInf" },
                
                // Assegure-se de que `response` seja um array e desconstrua se necessário
                {
                  $addFields: {
                    "formInf.weddingsInf.response": {
                      $cond: {
                        if: { $isArray: "$formInf.weddingsInf.response" },
                        then: "$formInf.weddingsInf.response",
                        else: [ "$formInf.weddingsInf.response" ] // Se não for array, coloque-o dentro de um array
                      }
                    }
                  }
                },
                
                // Desconstrua o array response se for um array de respostas
                { $unwind: { path: "$formInf.weddingsInf.response", preserveNullAndEmptyArrays: true } },


                {
                  $match: {
                    "formInf.weddingsInf.response": {
                      $nin: ["", null, [], " "] // Exclui strings vazias, null, arrays vazios e strings contendo apenas espaços
                    }
                  }
                },
                
                // Agrupe por título e resposta para contar a quantidade de cada resposta
                {
                  $group: {
                    _id: { title: "$formInf.weddingsInf.title", response: "$formInf.weddingsInf.response" },
                    pessoas: { $sum: 1 }
                  }
                },
                
                // Contar o total de respostas para cada título
                {
                  $group: {
                    _id: "$_id.title",
                    responses: {
                      $push: {
                        response: "$_id.response",
                        pessoas: "$pessoas"
                      }
                    },
                    totalResponses: { $sum: "$pessoas" }
                  }
                },

                {
                  $sort: { _id: 1 } // 1 para crescente, -1 para decrescente
                },
                
                // Calcule a porcentagem com base no total de respostas
                {
                  $addFields: {
                    responses: {
                      $map: {
                        input: "$responses",
                        as: "resp",
                        in: {
                          response: "$$resp.response",
                          pessoas: "$$resp.pessoas",
                          percentagem: {
                            $concat: [
                              {
                                $toString: {
                                  $multiply: [
                                    { $divide: ["$$resp.pessoas", "$totalResponses"] },
                                    100
                                  ]
                                }
                              },
                              "%"
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                
                // Formate o resultado final
                {
                  $project: {
                    _id: 0,
                    title: "$_id",
                    responses: 1
                  }
                }
            ]);

            const pregnancyInf = await Form.aggregate([
                // Desconstrua o array pregnancyInf para processar cada item separadamente
                { $unwind: "$formInf.pregnancyInf" },
                
                // Assegure-se de que `response` seja um array e desconstrua se necessário
                {
                  $addFields: {
                    "formInf.pregnancyInf.response": {
                      $cond: {
                        if: { $isArray: "$formInf.pregnancyInf.response" },
                        then: "$formInf.pregnancyInf.response",
                        else: [ "$formInf.pregnancyInf.response" ] // Se não for array, coloque-o dentro de um array
                      }
                    }
                  }
                },
                
                // Desconstrua o array response se for um array de respostas
                { $unwind: { path: "$formInf.pregnancyInf.response", preserveNullAndEmptyArrays: true } },

                {
                  $match: {
                    "formInf.pregnancyInf.response": {
                      $nin: ["", null, [], " "] // Exclui strings vazias, null, arrays vazios e strings contendo apenas espaços
                    }
                  }
                },
                
                // Agrupe por título e resposta para contar a quantidade de cada resposta
                {
                  $group: {
                    _id: { title: "$formInf.pregnancyInf.title", response: "$formInf.pregnancyInf.response" },
                    pessoas: { $sum: 1 }
                  }
                },
                
                // Contar o total de respostas para cada título
                {
                  $group: {
                    _id: "$_id.title",
                    responses: {
                      $push: {
                        response: "$_id.response",
                        pessoas: "$pessoas"
                      }
                    },
                    totalResponses: { $sum: "$pessoas" }
                  }
                },

                {
                  $sort: { _id: 1 } // 1 para crescente, -1 para decrescente
                },
                
                // Calcule a porcentagem com base no total de respostas
                {
                  $addFields: {
                    responses: {
                      $map: {
                        input: "$responses",
                        as: "resp",
                        in: {
                          response: "$$resp.response",
                          pessoas: "$$resp.pessoas",
                          percentagem: {
                            $concat: [
                              {
                                $toString: {
                                  $multiply: [
                                    { $divide: ["$$resp.pessoas", "$totalResponses"] },
                                    100
                                  ]
                                }
                              },
                              "%"
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                
                // Formate o resultado final
                {
                  $project: {
                    _id: 0,
                    title: "$_id",
                    responses: 1
                  }
                }
            ]);

            const contraceptivesInf = await Form.aggregate([
                // Desconstrua o array contraceptivesInf para processar cada item separadamente
                { $unwind: "$formInf.contraceptivesInf" },
                
                // Assegure-se de que `response` seja um array e desconstrua se necessário
                {
                  $addFields: {
                    "formInf.contraceptivesInf.response": {
                      $cond: {
                        if: { $isArray: "$formInf.contraceptivesInf.response" },
                        then: "$formInf.contraceptivesInf.response",
                        else: [ "$formInf.contraceptivesInf.response" ] // Se não for array, coloque-o dentro de um array
                      }
                    }
                  }
                },
                
                // Desconstrua o array response se for um array de respostas
                { $unwind: { path: "$formInf.contraceptivesInf.response", preserveNullAndEmptyArrays: true } },

                {
                  $match: {
                    "formInf.contraceptivesInf.response": {
                      $nin: ["", null, [], " "] // Exclui strings vazias, null, arrays vazios e strings contendo apenas espaços
                    }
                  }
                },
                
                // Agrupe por título e resposta para contar a quantidade de cada resposta
                {
                  $group: {
                    _id: { title: "$formInf.contraceptivesInf.title", response: "$formInf.contraceptivesInf.response" },
                    pessoas: { $sum: 1 }
                  }
                },
                
                // Contar o total de respostas para cada título
                {
                  $group: {
                    _id: "$_id.title",
                    responses: {
                      $push: {
                        response: "$_id.response",
                        pessoas: "$pessoas"
                      }
                    },
                    totalResponses: { $sum: "$pessoas" }
                  }
                },

                {
                  $sort: { _id: 1 } // 1 para crescente, -1 para decrescente
                },
                
                // Calcule a porcentagem com base no total de respostas
                {
                  $addFields: {
                    responses: {
                      $map: {
                        input: "$responses",
                        as: "resp",
                        in: {
                          response: "$$resp.response",
                          pessoas: "$$resp.pessoas",
                          percentagem: {
                            $concat: [
                              {
                                $toString: {
                                  $multiply: [
                                    { $divide: ["$$resp.pessoas", "$totalResponses"] },
                                    100
                                  ]
                                }
                              },
                              "%"
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                
                // Formate o resultado final
                {
                  $project: {
                    _id: 0,
                    title: "$_id",
                    responses: 1
                  }
                }
            ]);

            const accessibilityInf = await Form.aggregate([
                // Desconstrua o array accessibilityInf para processar cada item separadamente
                { $unwind: "$formInf.accessibilityInf" },
                
                // Assegure-se de que `response` seja um array e desconstrua se necessário
                {
                  $addFields: {
                    "formInf.accessibilityInf.response": {
                      $cond: {
                        if: { $isArray: "$formInf.accessibilityInf.response" },
                        then: "$formInf.accessibilityInf.response",
                        else: [ "$formInf.accessibilityInf.response" ] // Se não for array, coloque-o dentro de um array
                      }
                    }
                  }
                },
                
                // Desconstrua o array response se for um array de respostas
                { $unwind: { path: "$formInf.accessibilityInf.response", preserveNullAndEmptyArrays: true } },

                {
                  $match: {
                    "formInf.accessibilityInf.response": {
                      $nin: ["", null, [], " "] // Exclui strings vazias, null, arrays vazios e strings contendo apenas espaços
                    }
                  }
                },
                
                // Agrupe por título e resposta para contar a quantidade de cada resposta
                {
                  $group: {
                    _id: { title: "$formInf.accessibilityInf.title", response: "$formInf.accessibilityInf.response" },
                    pessoas: { $sum: 1 }
                  }
                },

                {
                  $sort: { _id: 1 } // 1 para crescente, -1 para decrescente
                },
                
                // Contar o total de respostas para cada título
                {
                  $group: {
                    _id: "$_id.title",
                    responses: {
                      $push: {
                        response: "$_id.response",
                        pessoas: "$pessoas"
                      }
                    },
                    totalResponses: { $sum: "$pessoas" }
                  }
                },
                
                // Calcule a porcentagem com base no total de respostas
                {
                  $addFields: {
                    responses: {
                      $map: {
                        input: "$responses",
                        as: "resp",
                        in: {
                          response: "$$resp.response",
                          pessoas: "$$resp.pessoas",
                          percentagem: {
                            $concat: [
                              {
                                $toString: {
                                  $multiply: [
                                    { $divide: ["$$resp.pessoas", "$totalResponses"] },
                                    100
                                  ]
                                }
                              },
                              "%"
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                
                // Formate o resultado final
                {
                  $project: {
                    _id: 0,
                    title: "$_id",
                    responses: 1
                  }
                }
            ]);

            const violenceInf = await Form.aggregate([
                // Desconstrua o array violenceInf para processar cada item separadamente
                { $unwind: "$formInf.violenceInf" },
                
                // Assegure-se de que `response` seja um array e desconstrua se necessário
                {
                  $addFields: {
                    "formInf.violenceInf.response": {
                      $cond: {
                        if: { $isArray: "$formInf.violenceInf.response" },
                        then: "$formInf.violenceInf.response",
                        else: [ "$formInf.violenceInf.response" ] // Se não for array, coloque-o dentro de um array
                      }
                    }
                  }
                },
                
                // Desconstrua o array response se for um array de respostas
                { $unwind: { path: "$formInf.violenceInf.response", preserveNullAndEmptyArrays: true } },

                {
                  $match: {
                    "formInf.violenceInf.response": {
                      $nin: ["", null, [], " "] // Exclui strings vazias, null, arrays vazios e strings contendo apenas espaços
                    }
                  }
                },
                

                
                
                // Agrupe por título e resposta para contar a quantidade de cada resposta
                {
                  $group: {
                    _id: { title: "$formInf.violenceInf.title", response: "$formInf.violenceInf.response" },
                    pessoas: { $sum: 1 }
                  }
                },


                {
                  $sort: { _id: 1 } // 1 para crescente, -1 para decrescente
                },
                
                // Contar o total de respostas para cada título
                {
                  $group: {
                    _id: "$_id.title",
                    responses: {
                      $push: {
                        response: "$_id.response",
                        pessoas: "$pessoas"
                      }
                    },
                    totalResponses: { $sum: "$pessoas" }
                  }
                },
                
                // Calcule a porcentagem com base no total de respostas
                {
                  $addFields: {
                    responses: {
                      $map: {
                        input: "$responses",
                        as: "resp",
                        in: {
                          response: "$$resp.response",
                          pessoas: "$$resp.pessoas",
                          percentagem: {
                            $concat: [
                              {
                                $toString: {
                                  $multiply: [
                                    { $divide: ["$$resp.pessoas", "$totalResponses"] },
                                    100
                                  ]
                                }
                              },
                              "%"
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                
                // Formate o resultado final
                {
                  $project: {
                    _id: 0,
                    title: "$_id",
                    responses: 1
                  }
                }
            ]);


            const baseRecord = await Form.findOne({}); // Adapte o critério de busca conforme necessário

// Passo 2: Extraia a ordem das perguntas (supondo que a ordem está em 'formInf.socialInf')
          const questionOrder = baseRecord.formInf.healthInf.map(item => item.title); // ou o campo que define a ordem

          

          function receiveInf(stapeRespose, base){


            const organizedResponses = base.map(question => {
              const foundResponse = stapeRespose.find(item => item.title === question);
              return foundResponse ? foundResponse : { title: question, responses: [] }; // Retorna uma estrutura vazia se não encontrar
            });

            return organizedResponses

          }

      
        //   console.log(result);
        return res.json({
                value:{
                   socialInf:receiveInf(socialInf, baseRecord.formInf.socialInf.map(item => item.title)), 
                   healthInf:receiveInf(healthInf, baseRecord.formInf.healthInf.map(item => item.title)),
                   weddingsInf:receiveInf(weddingsInf, baseRecord.formInf.weddingsInf.map(item => item.title)), 
                   pregnancyInf:receiveInf(pregnancyInf, baseRecord.formInf.pregnancyInf.map(item => item.title)), 
                   contraceptivesInf:receiveInf(contraceptivesInf, baseRecord.formInf.contraceptivesInf.map(item => item.title)), 
                   accessibilityInf:receiveInf(accessibilityInf, baseRecord.formInf.accessibilityInf.map(item => item.title)), 
                   violenceInf:receiveInf(violenceInf, baseRecord.formInf.violenceInf.map(item => item.title))
                  },
                message:"sucesso!"
            })
            

        }catch (error) {
        //This is forwarded to the global error handler. Do not change it.
            if(!error.statusCode) error.statusCode = 500
            next(error)         
        }
      }

}


