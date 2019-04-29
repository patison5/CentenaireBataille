const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.testModel = (login, callback) => {
	if (callback) 
		callback("error", {
			message: "failed"
		})
}



exports.create = function (user, callback) {
	db.get().collection('users').insert(user, function (err, docs) {
		callback(err, docs)
	})
}


exports.allUsers = function(callback) {
	db.get().collection('users').find().toArray(function(err, docs) {
		callback(err, docs);
	});
};


exports.checkUserExistance = function (login, callback) {
	db.get().collection('users').findOne({ login: login }, function(err, docs) {
		callback(err, docs);
	});
}