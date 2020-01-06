module.exports = app => {
    //  Define na variável Tasks o modelo de tarefas carregado pelo arquivo db.js
    const Tasks = app.db.models.Tasks

    app.route("/tasks")
        // "/tasks": Lista de tarefas
        .get((req,res) => {
            // .findAll(), função do Sequelize que busca por multiplos elementos no BD
            Tasks.findAll({})
                // No caso de tudo ocorrer bem, envia o resultado da busca das tarefas como 
                //resposta formatada para JSON
                .then(result => res.json(result))
                // No caso de erro, envia como resposta o status 412 e uma mensagem de erro 
                // formatada em JSON
                .catch(error => {
                    res.status(412).json({msg: error.message})
                })
        })
        // "/tasks": Cadastra uma nova tarefa
        .post((req,res) => {
            Tasks.create(req.body)
                // No caso de tudo ocorrer bem, envia 
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message})
                })

        })
        
    app.route("/tasks/:id")
    // "/tasks/1": Consulta uma tarefa
    .get((req,res) => {
        Tasks.findOne({where: req.params})
            .then(result => {
                if(result){
                    res.json(result)
                }else{
                    res.sendStatus(404)
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
    })
    // "/tasks/1": Atualiza uma tarefa
    .put((req,res) => {
        Tasks.update(req.body, {where: req.params})
            .then(restult => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
    })
    // "/tasks/1": Exclui uma tarefa
    .delete((req,res) => {
        Tasks.destroy({where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
    })
}