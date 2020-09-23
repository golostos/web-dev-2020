const Sequelize = require('sequelize')
const sequelize = require('./index')

const Model = Sequelize.Model
class Task extends Model {}

Task.init({
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    regexp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    samples: {
        type: Sequelize.JSON
    }
}, {
    sequelize
})

module.exports = Task