const db = require('../utils/db/db');
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
        systemError: ""
    };
    db.get().collection("Battles").find({user1: userLogin, end: false}).count().then((count) => {
        if (count === 0) {
            db.get().collection("Battles").insertOne(battle, (err) => {
                if (!err) {
                    answer.ok = true;
                    answer.message = "Battle created: " + battle.name;
                } else {
                    answer.systemError = err;
                }
                callback(answer);
            });
        } else {
            answer.message = "Вы уже создали сражение ! Сражение: ";
            callback(answer);
        }
    });
};

exports.enterBattle = function (idBattle, userLogin, callback) {

    let answer = {
        ok: false,
        message: "",
        systemError: ""
    };

    db.get().collection("Battles").findOneAndUpdate({name: idBattle}, {$set: {user2: userLogin}}, {returnOriginal: false}, function (err, docs) {
        if (!err) {
            answer.ok = true;
            answer.message = docs.value;
        } else {
            answer.systemError = err;
        }
        callback(answer);
    })
};