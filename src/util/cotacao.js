const request = require('request');
const api_token = 'e9e0a017&symbol'
const chalk = require('chalk');


const cotacao = (symbol,callback) => {

    const url = `https://api.hgbrasil.com/finance/stock_price?key=${api_token}=${symbol}`
    console.log(url)
    
    request({url: url, json: true},(err,response) => {

        if (err){
            const error = {
                message: 'Algo errado!'
            }
            callback(null, err)
        }

       
  
        
    const parsedJson = Object.values(response.body.results)[0]
    console.log (parsedJson.error)
    if(parsedJson.error){
        const error = {
            message: 'Dados não encontrados para os parâmetros informados!'
        }

        console.log(error.message)
       return  callback(null, error.message)
    }


    if (!parsedJson) {
        console.log('deu erro')
    }

   // console.log(parsedJson)
    
   //maneira 1
   const {name,company_name,price,region} = parsedJson
   const data = {name,company_name,price,region}

   //maneira 2 (destruct)
    /*const data = {        
        symbol         : parsedJson.name,
        name           : parsedJson.company_name,
        price          : parsedJson.price,
        description    : parsedJson.region
    }*/
        callback(data, null);
    })
} 


module.exports = {
    cotacao
}

