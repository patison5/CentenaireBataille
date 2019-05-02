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
    db.get().collection('Users').insert(user, function (err) {
        callback(err);
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
 * Получаем пользователя по его логину
 * @param login
 * @param callback
 */
exports.getUserByLogin = function (login, callback) {
    db.get().collection('Users').findOne({login: login}, function (err, docs) {
        callback(err, docs);
    });
};

/**
 * Получаем пользователя по его токену
 * @param token
 * @param callback
 */
exports.getUserByToken = function (token, callback) {
    db.get().collection('Users').findOne({token: token}, function (err, docs) {
        callback(err, docs);
    });
};

/**
 * Обновляем никнейм пользователя
 * @param (login)
 * @param (nickname)
 * @param (callback)
 */
exports.updateNickname = function (login, nickname, callback) {
    let answer = {
        ok: false,
        message: "Can't update nickname",
        systemError: ""
    };

    db.get().collection("Users").findOneAndUpdate({login: login}, {$set: {nickname: nickname}}, {returnOriginal: false}, function (err, user) {
        if (!err && user) {
            answer.ok = true;
            answer.message = "Nickname changed ! New nickname: " + user.value.nickname;
        } else {
            answer.systemError = err;
        }
        callback(answer);
    });
};

/**
 * Устанавливает токен авторицаа пользователя
 * @param login
 * @param callback
 */
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