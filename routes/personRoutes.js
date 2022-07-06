const router = require('express').Router()

const Person = require('../models/Person')

// rotas create person POST
router.post('/', async (req, res) =>{
    const {nome, email, telefone, cargo, login, senha, superior} = req.body
    
    // verifica se campos obrigatórios estao vazios
    if(!nome){
        res.status(422).json({ error: 'O nome é obrigatório' })
    } else if(!email){
        res.status(422).json({ error: 'O email é obrigatório' })
    } else if(!cargo){
        res.status(422).json({ error: 'O cargo é obrigatório' })
    } else if(!login){
        res.status(422).json({ error: 'O login é obrigatório' })
    } else if(!senha){
        res.status(422).json({ error: 'A senha é obrigatório' })
        return
    }
    // verifica se foi cadastrado cargo correto
    if(cargo !== 'Diretor' && cargo !== 'Gerente' && cargo !== 'Consultor'){
        res.status(422).json({ error: 'Cargo deve ser preechido com: Diretor ou Gerente ou Consultor' })
        return
    }
    
    const person = {
        nome,
        email,
        telefone,
        cargo,
        login,
        senha,
        superior
    }

    // create
    try{
       // regra de hierarquia
        const personDiretor = await Person.findOne({ nome: superior, cargo: 'Diretor' })
        const personGerente = await Person.findOne({ nome: superior, cargo: 'Gerente' })
        const personUsuario = await Person.findOne({ nome: superior })

        if( cargo === 'Diretor' && personDiretor ){
            await Person.create(person)
            res.status(201).json({ message: 'Usuário inserido com sucesso' })
        } else{
            res.status(422).json({ error: 'O superior para Diretor só pode ser outro Diretor' })
            return
        }
        if( cargo === 'Gerente' && (personDiretor || personGerente) ){
            await Person.create(person)
            res.status(201).json({ message: 'Usuário inserido com sucesso' })
        } else{
            res.status(422).json({ error: 'O superior para Gerente só pode ser outro Gerente ou Diretor' })
            return
        }
        if( cargo == 'Consultor' && personUsuario.matchedCount > 0 ){
            await Person.create(person)
            res.status(201).json({ message: 'Usuário inserido com sucesso' })
        } else{
            res.status(422).json({ error: 'O superior para Consultor precisa ser usuário no sistema' })
            return
        } 
        
    } catch (error){
        res.status(500).json({ error: error })
    }

})

// rota find person GET
router.get('/', async (req, res) => {
    try{

        const people = await Person.find()

        res.status(200).json(people)

    } catch (error){
        res.status(500).json({ error: error })
    }
})

// find person por id GET (relatorio)
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try{

        const person = await Person.find({ superior: id })

        if(!person){
            res.status(422).json({ message: 'Usuário não foi encontrado' })
            return
        }

        res.status(200).json(person)

    } catch (error){
        res.status(500).json({ error: error })
    }
})

// rota update person por id
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, email, telefone, cargo, login, senha, superior} = req.body

        // verifica se campos obrigatórios estao vazios
        if(!nome){
            res.status(422).json({ error: 'O nome é obrigatório' })
        } else if(!email){
            res.status(422).json({ error: 'O email é obrigatório' })
        } else if(!cargo){
            res.status(422).json({ error: 'O cargo é obrigatório' })
        } else if(!login){
            res.status(422).json({ error: 'O login é obrigatório' })
        } else if(!senha){
            res.status(422).json({ error: 'A senha é obrigatório' })
            return
        }
        // verifica se foi cadastrado cargo correto
        if(cargo !== 'Diretor' && cargo !== 'Gerente' && cargo !== 'Consultor'){
            res.status(422).json({ error: 'Cargo deve ser preechido com: Diretor ou Gerente ou Consultor' })
            return
        }
        
    const person = {
        nome,
        email,
        telefone,
        cargo,
        login,
        senha,
        superior
    }

    try{

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({ message: 'Usuário não foi encontrado' })
            return
        }

        res.status(200).json(person)

    } catch (error){
        res.status(500).json({ error: error })
    }
})

// rota de delete person 
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const person = await Person.find({ cargo: id })

    if(!person){
        res.status(422).json({ message: 'Usuário não foi encontrado' })
        return
    }

    try{

        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'Usuário removido com sucesso' })

    } catch (error){
        res.status(500).json({ error: error })
    }
})

module.exports = router