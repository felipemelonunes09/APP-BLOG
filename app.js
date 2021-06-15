const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./models/database')
const session = require('express-session')

const app = express()
const PORT = 8081

const CategoryController = require('./category/CategoryController')
const ArticleController = require('./article/ArticleController')
const UserController = require('./user/UserController')

const article = require('./models/Article')
const category = require('./models/Category')
const user = require('./models/User')



// Config

	// Ejs - view engine
	app.set('view engine', 'ejs')

	// Body-parser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())

	// Arquivos estáticos (front-end)
	app.use(express.static('public'))

	// Database
	connection.authenticate().then(() => {
		console.log('[SERVER] database_status: ok')
	}).catch((erro) => {	
		console.log('[SERVER] database_status: erro')
		console.log(erro)
	})

	// Session
	// Redis db para session e cash
	app.use(session({
		secret: 'shadow',
		cookie: { 
			maxAge: 30000000
		}
	}))

	// Router
	app.use('/user', UserController)
	app.use('/category', CategoryController)
	app.use('/article', ArticleController)

// Rotas
app.get('/', (req, res) => {
	console.log('[SERVER] view: default')

	article.findAll({
		order: [
			['id', 'DESC']
		],
		limit: 4
	}).then((articles) => {
	
		category.findAll().then((categories) => {
			res.render('index', {articles: articles, categories: categories})
		})

	}).catch((erro) => {
		console.log(erro)
	})
})

app.get('/article/:slug', (req, res) => {
	var slug = req.params.slug
	article.findOne({where: { slug: slug}}).then((art) => {

		if (article != undefined){
			res.render('admin/article/article', {article: art})
		}
		else{
			res.redirect('/')
		}

	}).catch((erro) => {
		console.log(erro)
		res.redirect('/')
	})

})


// =========================================================



app.listen(PORT, () => {
	console.log('[SERVER] server on-line')
	console.log('[SERVER] available on: localhost:' + PORT)
}) 