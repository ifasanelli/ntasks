module.exports = (sequelize, DataType) => {
    // sequelize.define("Tasks") é responsável por criar oualterar uma tabela no banco de dados. 
    // Isso ocorre quando o Sequelize faz uma sincronização no boot da aplicação.
    const Tasks = sequelize.define("Tasks", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },{
        classMethods: {
            // Função associate() permite realizar uma associação entre os modelos
            associate: (models) => {
                Tasks.belongsTo(models.Users)
            }
        }
    })
    return Tasks
}