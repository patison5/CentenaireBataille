const Users = require('../models/users');

exports.test = (req, res) => {
	var login = "root";

	Users.testModel(login, (err, docs) => {
		res.json({
			ok: false, 
			error: "Неправильный логин или пароль!",
			fields: ['login', docs.message]
		})
	})
}

exports.register = (req, res) => {
	const login = req.body.userName;
	const password = req.body.userPassword;
	
	// console.log({
	// 	login: req.body.userName,
	// 	password: req.body.userPassword
	// })

	// create if users with same nickname doesn't exist

	Users.checkUserExistance(login, (error, result) => {
		// result should contain the user data if exist...
		
		if (!result) {
			Users.create({
				login: req.body.userName,
				password: req.body.userPassword
			}, (err, docs) => {
				res.json({
					ok: true, 
					message: 'User created!'
				})
			})
		} else {
			res.json({
				ok: false,
				message: 'User with the same nickname already exist'
			})
		}
	})
}

exports.login = (req, res) => {
	console.log('logining with ' + req.body.userName)

	console.log({
		login: req.body.userName,
		password: req.body.userPassword
	})



	Users.testModel("login", (err, docs) => {
		res.json({
			ok: false, 
			error: "Неправильный логин или пароль!",
			fields: ['login', docs.message]
		})
	})
}



exports.allUsers = (req, res) => {
	Users.allUsers(function (err, docs) {
		res.send(docs)
	})
}