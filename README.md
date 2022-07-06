# crud_node_postman

Projeto de CRUD em NodeJs testando API com Postman

### Pré-requisitos globais
'npm i -g express mongoose dotenv'

### Instalação
'npm install'

### Para rodar o projeto
'npm start'

### POST localhost:3000/person
'cria usuario'
{
    "nome": "Teste",
    "email": "teste@teste.com",
    "telefone": "(11)99999-9999",
    "cargo": "Diretor",
    "login": "teste",
    "senha": "teste",
    "superior": ""
}

### GET localhost:3000/person
'pesquisa usuarios'

### GET localhost:3000/person/Teste
'pesquisa usuario pelo nome'

### PATCH localhost:3000/person/:id
'atualiza usuario por id'
{
    "nome": "Teste",
    "email": "teste@teste.com.br",
    "telefone": "(11)99999-9999",
    "cargo": "Diretor",
    "login": "teste",
    "senha": "teste",
    "superior": ""
}

### DELETE localhost:3000/person/:id
'deleta usuario por id'
