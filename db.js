const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

let db = null

module.exports = app => {
    if(!db){
        const config = app.libs.config
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        )
        db = {
            sequelize,
            Sequelize,
            models: {}
        }
        const dir = path.join(__dirname, "models")
        // Retorna e itera um array de strings referente aos nomes de arquivos existentes no diretório models
        fs.readdirSync(dir).forEach(file => {
            // Dentro do escopo de iteração são carregados todos os modelos via função sequelize.import()
            const modelDir = path.join(dir,file)
            const model = sequelize.import(modelDir)
            // E então inseridos nesse modelo dentro da estrutura db.models
            db.models[model.name] = model
        })
        // Após carregados, os modelos são iterados novamente
        Object.keys(db.models).forEach(key => {
            // E é executada a função que estabelece a relação entre os modelos
            if (db.models[key].hasOwnProperty('associate')){
                db.models[key].associate(db.models);
            }
        })
    }
    return db
}