module.exports = app => {

    //  Envia uma resposta ao endpoint root em formato JSON com a msg "NTask API"
    app.get("/", (req,res) => {
        res.json({status:"NTask API"})
    })

}