const bcrypt = require('bcryptjs')
const user = require('../models/User')
const session = require('express-session')
const express = require('express')
const isUser = require('../middleware/isUser')

const router = express.Router()



router.get('/admin',(req, res) => {

	user.findAll().then((users) => {
		res.render('admin/user/index', {users: users})
	}).catch((erro) => {
		console.log(erro)
	})
})

router.get('/admin/add', (req, res) => {
	res.render('admin/user/add')
})

router.get('/admin/login', (req, res) => {
	res.render('admin/user/login')
} )


router.get('admin/logout', (req, res) => {
	req.session.user = undefined
	res.redirect('/')
})

// =======================================

router.post('/admin/add', (req, res) => {
	var email = req.body.formEmail
	var password = req.body.formPassword


	user.findOne({where: {email: email}}).then((users) => {
		if (users ==  undefined){

			console.log('[SERVER] process: admin/user/add status: init')
			// Verificar se os dados não são nulos
			var salt = bcrypt.genSaltSync(10)
			var hash = bcrypt.hashSync(password, salt);

			user.create({
				email: email,
				password: hash
			}).then(() => {
				console.log('[SERVER] process: admin/user/add status: done')
			}).catch((erro) => {
				console.log('[SERVER] process: admin/user/add status: erro')
				console.log(erro)
			})

	res.redirect('/')

		} else{
			res.redirect('/user/admin/add')
		}
	})

})

router.post('/admin/login', (req, res) => {

	var email = req.body.formEmail
	var password = req.body.formPassword

	user.findOne({ where: {email: email}}).then((user) => {

		if (user != undefined){
			var correct = bcrypt.compareSync(password, user.password)
			if (correct){
				req.session.user = {
					id: user.id,
					email: user.email
				}
				console.log('[SERVER] = ' + req.session.user)
				res.redirect('/')
			}
		}
	}).catch((erro) => {
		console.log(erro)
	})

})

module.exports = router