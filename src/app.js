const path = require('path')
const { response } = require('express')
const express = require('express')
const app = express()
const hbs = require('hbs')
const c = require('./util/cotacao')
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)

app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)
//defincições de rotas


app.get('',(req, resp) => {
    resp.render('index', {
        title: 'bem vindo',
        author: 'Leandro Valois'
    })
})


app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'sobre',
        author: 'Leandro Valois'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'help...',
        author: 'Leandro Valois'
    })
})

//cotacoes
app.get('/cotacoes',(req, resp) => {
    if (!req.query.ativo) {
        
        return resp.status(400).json({
            error : {
                message:'O ativo deve ser informado.',
                code: 400
            }
        })
        
        
        /*const error = {
            message: 'O ativo deve ser informado.'
        }
        resp.statusCode = 400
        return resp.send(error.message)*/    
    }

    const symbol = req.query.ativo.toUpperCase()
    c.cotacao(symbol, (data, err) => {
        if (err) {

            return resp.status(500).json({
                error : {
                    message:'Informe o ativo.',
                    code: 500
                }
            })
           
            /*console.log(err)
           resp.statusCode = 500
           return resp.send(err) */   
        }

        console.log(data)
        resp.statusCode = 200
        resp.send(data)
    })
    
    
})

app.get('*', (req, resp) => {
    
    const errorMessage = 'Página não encontrada'
    resp.render('404', {
        title: '404',
        errorMessage,
        author: 'Leandro Valois'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('servidor online na porta 3000')
})

