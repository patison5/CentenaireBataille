const Utils = require("../utils/utils");

const Users = require("../models/users");
const Battles = require("../models/battle");
/**
 * Return ID client
 * @param socket
 */
exports.getID = function (socket) {
    socket.emit("getID", socket.id);
};

exports.createBattle = function (data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Battles.createBattle(cookie.get("login"), data.serverId, (answer) => {
        socket.emit("createBattle", answer);
    });

};

exports.enterBattle = function (data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Battles.enterBattle(data.idBattle, cookie.get("login"), (answer) => {
        socket.emit("enterBattle", answer);
    });
};

exports.connectBattle = function (data, io, socket) {
    let cookie = Utils.getCookie(socket);
    socket.join(data.battleId, () => {
        socket.to(data.battleId).emit('message', {login: cookie.get("login")});
    });
};
exports.sendPos = function (data, io, socket) {

    let room = 0;
    for (let r in socket.rooms) {
        if (r !== socket.id) {
            room = r;
        }
    }
    socket.to(room).emit('message', data);
};
exports.endBattle = function (data, io, socket) {
    let room = 0;
    for (let r in socket.rooms) {
        if (r !== socket.id) {
            room = r;
        }
    }
    Battles.endBattle(room, (data) => {
        io.sockets.to(room).emit('endBattle', data);
    });
};

exports.changeNickname = function (data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Users.getUserByToken(cookie.get("token"), function (err, u) {
        Users.updateNickname(u.login, data.nickname, (data) => {
            socket.emit('nicknameChanged', data);
        });
    });

};

exports.getBattles = function (io, socket) {
    Battles.getBattles((result) => {
        socket.emit('listBattles', result);
    });
};
exports.getCurrentBattle = function (io, socket) {
    let cookie = Utils.getCookie(socket);
    Battles.getBattlesUser(cookie.get("login"), (result) => {
        socket.emit('getCurrentBattle', result);
    });
};
exports.reConnect = function (io, socket) {
    let cookie = Utils.getCookie(socket);
    Battles.getBattlesUser(cookie.get("login"), (result) => {
        socket.emit('reConnect', result);
    });
};
exports.getCountClients = function (io) {
    io.emit('countUsers', io.engine.clientsCount);
};
