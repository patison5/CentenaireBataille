const MongoClient = require('mongodb').MongoClient;

const state = {
	db: null
};

exports.connect = function (url, callback) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {
		if (err) {
            return callback(err);
		}

		state.db = database.db('rootdb');

        callback();
	});
};

exports.get = function () {
	return state.db;
};