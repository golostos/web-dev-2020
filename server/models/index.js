const Sequelize = require('sequelize')

const sequelize = new Sequelize('regex', 'regex_user', 'test12345', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize