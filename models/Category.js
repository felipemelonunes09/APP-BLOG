const sequelize = require('sequelize')
const connection = require('./database')

const Category = connection.define('category',{
	title:{
		type: sequelize.STRING,
		allowNull: false
	},
	slug:{
		type: sequelize.STRING,
		allowNull: false
	}
})



Category.sync({force: false}).then(() => {
	console.log('[SERVER] - model.Category: true')
}).catch((erro) => {
	console.log('[SERVER] - model.Category: false')
	console.log(erro)
})

module.exports = Category