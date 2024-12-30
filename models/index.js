const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://postgres:12341234@localhost:5433/ppob`, {dialect: "postgres"})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel') (sequelize, DataTypes)

module.exports = db