const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    console.log('func 1')
    res.status(200).send('Meu Backend')
    next()
})
app.get('/', (req, res, next) => {
    console.log('func 2')
    res.status(200).send('Meu Backend2')
})

app.listen(3000,() =>{
    console.log('Backend executando...')
})