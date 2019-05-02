const MongoClient = require('mongodb').MongoClient;
/**
 * state - массив сущностей db
 *        db - ссылка на определенную базу данных (rootDb)
 */
const state = {
	db: null
};
/**
 * Инициализация базы данных
 * @param url - ссылка на базу данных
 * @param callback - келлбек послке подключения к базе данных
 */
exports.connect = function (url, callback) {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {
        if (!err) {
            state.db = database.db('rootdb');
            callback();
        } else {
            callback(err);
        }
	});
};

/**
 * get - получить массив сущностей Bd
 *
 */
exports.get = function () {
    return state.db;
};