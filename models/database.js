const sequelize = require('sequelize')

const connection = new sequelize('blogapp', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '-03:00'
})

// exportando conexão
module.exports = connection