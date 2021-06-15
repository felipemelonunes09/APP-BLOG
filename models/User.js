const sequelize = require('sequelize')
const connection = require('./database')

const User = connection.define('users', {
	email: {
		type: sequelize.STRING,
		allowNull: false
	},
	password: {
		type: sequelize.STRING,
		allowNull: false
	}
})

User.sync({force: false}).then(() => {

}).catch((erro) => {
	
})

module.exports = User