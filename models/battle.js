const db = require('../utils/db/db');
const Users = require('./users');
exports.getBattles = function (callback) {
    let answer = {
        ok: false,
        message: null
    };

    db.get().collection("Battles").find({user2: null, end: false}).toArray((err, battles) => {
        if (!err) {
            answer.ok = true;
            answer.message = battles;
        } else {
            answer.message = "Error: " + err;
        }
        callback(answer);
    });
};

exports.getBattlesUser = function (login, callback) {
    let answer = {
        ok: false,
        message: null
    };

    db.get().collection("Battles").find({$or: [{user1: login}, {user2: login}], end: false}).toArray((err, battles) => {
        if (!err) {
            answer.ok = true;
            answer.message = battles;
        } else {
            answer.message = "Error: " + err;
        }
        callback(answer);
    });
};

exports.createBattle = function (userLogin, name, callback) {

    let battle = {
        name: userLogin + "#" + name,
        user1: userLogin,
        user2: null,
        end: false
    };

    let answer = {
        ok: false,
        message: "",
        url: null,
        battleId: null,
        systemError: ""
    };
    db.get().collection("Battles").find({user1: userLogin, end: false}).count().then((count) => {
        if (count === 0) {
            db.get().collection("Battles").insertOne(battle, (err, id) => {
                if (!err) {
                    answer.ok = true;
                    answer.message = "Battle created: " + battle.name;
                    answer.battleId = id.insertedId.toString();
                    Users.updateBattle(userLogin, id.insertedId.toString(), (err) => {
                        if (!err) {
                            answer.url = "battle/?battle=" + id.insertedId.toString();
                            callback(answer);
                        } else {
                            answer.systemError = err;
                            callback(answer);
                        }
                    });
                } else {
                    answer.systemError = err;
                    callback(answer);
                }
            });
        } else {
            let existNameBattle = "";
            this.getBattlesUser(userLogin, (d) => {
                existNameBattle = d.message[0].name;
                answer.message = "Вы уже создали сражение ! Сражение: " + existNameBattle;
                callback(answer);
            });
        }
    });
};

exports.enterBattle = function (idBattle, userLogin, callback) {

    let answer = {
        ok: false,
        message: "",
        systemError: ""
    };

    let isHaveBattle = true;

    this.getBattlesUser(userLogin, (data) => {
        if (data.message.length > 0) {
            isHaveBattle = true;
            answer.message = "Вы уже сражаетесь !";
            callback(answer);
        }
        if (data.message.length === 0) {
            isHaveBattle = false;
        }

        if (!isHaveBattle) {
            db.get().collection("Battles").findOneAndUpdate({
                name: idBattle,
                end: false
            }, {$set: {user2: userLogin}}, {returnOriginal: false}, function (err, docs) {
                if (!err && docs.value !== null) {
                    answer.ok = true;
                    answer.message = docs.value;
                    Users.updateBattle(userLogin, docs.value._id.toString(), (err) => {
                        if (!err) {
                            callback(answer);
                        } else {
                            answer.systemError = err;
                            callback(answer);
                        }
                    });
                } else {
                    answer.message = "Вы уже сражаетесь !";
                    answer.systemError = err;
                    callback(answer);
                }
            })
        }

    });

};

exports.endBattle = function (idBattle, callback) {

    let answer = {
        ok: false,
        message: "",
        systemError: ""
    };

    db.get().collection("Battles").findOneAndUpdate({_id: db.getId(idBattle)}, {$set: {end: true}}, {returnOriginal: false}, function (err, docs) {
        if (!err && !docs) {
            answer.ok = true;
            answer.message = "Battle \"" + docs.value.name + "\" ended !";

            let users = [docs.value.user1, docs.value.user2];

            for (let key in users) {
                Users.updateBattle(users[key], null, (err) => {
                    if (!err) {
                        callback(answer);
                    } else {
                        answer.systemError = err;
                        callback(answer);
                    }
                });
            }
        } else {
            answer.systemError = err;
            callback(answer);
        }
    })

};