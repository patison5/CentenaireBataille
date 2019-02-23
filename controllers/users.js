const User = require('../models/users');

exports.test = (req, res) => {
	var login = "root";

	User.testModel(login, (err, docs) => {
		res.json({
			ok: false, 
			error: "Неправильный логин или пароль!",
			fields: ['login', docs.message]
		})
	})
}

exports.register = (req, res) => {
	User.testModel("login", (err, docs) => {
		res.json({
			ok: false, 
			error: "Неправильный логин или пароль!",
			fields: ['login', docs.message]
		})
	})
}

exports.login = (req, res) => {
	User.testModel("login", (err, docs) => {
		res.json({
			ok: false, 
			error: "Неправильный логин или пароль!",
			fields: ['login', docs.message]
		})
	})
}