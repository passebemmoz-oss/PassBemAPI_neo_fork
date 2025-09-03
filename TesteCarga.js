const autocannon = require('autocannon')


async function FullTest(){

    const data = {}

    autocannon({
        title:'Teste',
        url:'',
        connections:10,
        duration:10,
        pipelining:1,
        workers:2,
        requests:[
            
            {
                method:'POST',
                path:'',
                headers:{
                    'Content-Type':'application/json'
                },                
            },
            {
                method:'GET',
                path:''
            },

        ]
    }, console.log)
}
