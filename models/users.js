const db = require('../utils/db/db');
const crypto = require('crypto');


/**
 * create {
 * - Создает запись нового пользователя в базе данных
 * }
 * @param user
 * @param callback
 */

exports.create = function (user, callback) {
    db.get().collection('Users').insert(user, function (err, docs) {
        callback(err, docs)
    })
};

/**
 * allUsers {
 * - Получаем массив всех пользователей
 * }
 * @param callback
 */

exports.allUsers = function (callback) {
    db.get().collection('Users').find().toArray(function (err, docs) {
        callback(err, docs);
    });
};

/**
 * getUserByLogin, getUserByToken {
 * - получам одну запись
 * }
 * @param login
 * @param callback
 */
exports.getUserByLogin = function (login, callback) {
    db.get().collection('Users').findOne({login: login}, function (err, docs) {
        callback(err, docs);
    });
};

exports.getUserByToken = function (token, callback) {
    db.get().collection('Users').findOne({token: token}, function (err, docs) {
        callback(err, docs);
    });
};

exports.updateNickname = function (login, nickname) {
    db.get().collection("Users").updateOne({login: login}, {$set: {nickname: nickname}});
};

exports.updateTokenAuthorization = function (login, callback) {
    /**
     * secret, token -
     * {
     * - Получаем кеш авторизации для записи в куку
     * }
     */
    const secret = Date.now().toString();
    const token = crypto.createHmac('sha256', secret)
        .update(login.toString())
        .digest('hex');

    /**
     *  - Обновляем кеш для пользователя и получаем обновленный документ
     */
    db.get().collection("Users").findOneAndUpdate({login: login}, {$set: {token: token}}, {returnOriginal: false}, function (err, docs) {
        callback(err, docs);
    })
};