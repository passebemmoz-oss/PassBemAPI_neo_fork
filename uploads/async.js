var fs = require('fs');
const axios = require("axios")
const Perguntas = require("../src/models/Pergunta")

const api =axios.create({
    baseURL: "http://localhost:3333"
})


async function Teste(){

	fs.rename('A.png', 'B.png',function(err){
		if(err){
			console.log("Error while renaming file "+err);
		}
  });
}

Teste()


/* fs.rename('Captura de ecrã de 2021-11-01 15-16-51-1636208556558.png', 'A.png',function(err){
  	if(err){
  		console.log("Error while renaming file "+err);
  	}
}); */

