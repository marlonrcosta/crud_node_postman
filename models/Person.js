const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    nome: String,
    email: String,
    telefone: String,
    cargo: String,
    login: String,
    senha: String,
    superior: String
})

module.exports = Person