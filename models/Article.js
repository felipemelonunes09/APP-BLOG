const sequelize = require('sequelize')
const connection =  require('./database')
const Category = require('./Category')

const Article = connection.define('article', {
	title: {
		type: sequelize.STRING,
		allowNull: false
	},
	body:{
		type: sequelize.TEXT,
		allowNull: false
	},
	slug:{
		type: sequelize.STRING,
		allowNull: false
	}
})

Article.belongsTo(Category)

// Cria um relacionamento entre categoria e artigo

Article.sync({force: false}).then(() => {
	console.log('[SERVER] - model.Article: true')
}).catch((erro) => {
	console.log('[SERVER] - model.Article: false')
	console.log(erro)
})

module.exports = Article