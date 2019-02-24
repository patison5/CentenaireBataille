const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://root:qwerty78@centenairebatailledb-shard-00-00-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-01-bnck4.mongodb.net:27017,centenairebatailledb-shard-00-02-bnck4.mongodb.net:27017/test?ssl=true&replicaSet=CentenaireBatailleDB-shard-0&authSource=admin&retryWrites=true";

const state = {
	db: null
};

exports.connect = function (url, collback) {
	if (state.db) {
		return collback();
	}

	MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {
		if (err) {
			console.log("Some shit is going on again! Check the fucking connection to the MongoDB!!!")
			return collback(err);
		}

		console.log("\nYou did it, bro! You connected to the MongoDB!!!\n")

		state.db = database.db('rootdb');

		// database.close();

		collback();
	});
}

exports.get = function () {
	return state.db;
}