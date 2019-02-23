const User = require('../models/users');

exports.register = (req, res) => {
	var login = "root";

	User.testModel(login, (err, docs) => {
		res.json({
			ok: false, 
			error: "Неправильный логин или пароль!",
			fields: ['login', docs.message]
		})
	})
}