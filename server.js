const express = require('express')
const app = express()
const consign = require('consign')

// Insere os módulos do projeto na variável 'app'
consign()
    .include("libs/config.js")
    .then("db.js")
    //.then("models") Será carregado diretamente pelo arquivo db.js por meio da função sequelize.import()
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app)

