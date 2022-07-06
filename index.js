// configuração inicial
const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// ler json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// rotas
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// rota inicial - endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.r5j0a.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectado no Mongoose')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
