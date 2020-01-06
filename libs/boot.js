module.exports = app => {
    // Função que sincroniza as tabelas do banco de dados com os modelos do Sequelize
    app.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => {
            console.log(`NTask API - Runing at: port ${app.get("port")}`)
        })
    })
}