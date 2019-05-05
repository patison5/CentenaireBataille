const Utils = require("../utils/utils");

const Users = require("../models/users");
const Battles = require("../models/battle");

const BattleManager = require("../utils/battleManager/battleManager");
/**
 * Return ID client
 * @param socket
 */


exports.call = function (io, socket) {
    socket.on("getID", function () {
        getID(socket);
    });
    socket.on("createBattle", function (data) {
        createBattle(data, io, socket);
    });
    socket.on("enterBattle", function (data) {
        enterBattle(data, io, socket);
    });
    socket.on("connectBattle", function (data) {
        connectBattle(data, io, socket);
    });
    socket.on("reConnect", function () {
        reConnect(io, socket);
    });
    socket.on("endBattle", function (data) {
        endBattle(data, io, socket);
    });
    socket.on("getCurrentBattle", function () {
        getCurrentBattle(io, socket);
    });
    socket.on("changeNickname", function (data) {
        changeNickname(data, io, socket);
    });
    socket.on("getCountUsers", function () {
        getCountClients(io, socket);
    });
    socket.on("listBattles", function () {
        getBattles(io, socket);
    });
    socket.on('disconnect', function () {
        console.log('Got disconnect: ' + socket.id);
    });
};

function getID(socket) {
    socket.emit("getID", socket.id);
}

function createBattle(data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Battles.createBattle(cookie.get("login"), data.serverId, (answer) => {
        BattleManager.addBattle(answer.battleId);
        socket.emit("createBattle", answer);
    });

}

function enterBattle(data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Battles.enterBattle(data.idBattle, cookie.get("login"), (answer) => {
        socket.emit("enterBattle", answer);
    });
}

function connectBattle(data, io, socket) {
    let cookie = Utils.getCookie(socket);
    if (BattleManager.getBattle(data.battleId) !== undefined) {
        BattleManager.getBattle(data.battleId).setSocket(socket);
    }
    socket.join(data.battleId, () => {
        socket.to(data.battleId).emit('message', {login: cookie.get("login")});
    });
}

function endBattle(data, io, socket) {
    let room = 0;
    for (let r in socket.rooms) {
        if (r !== socket.id) {
            room = r;
        }
    }
    Battles.endBattle(room, (data) => {
        io.sockets.to(room).emit('endBattle', data);
    });
}

function changeNickname(data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Users.getUserByToken(cookie.get("token"), function (err, u) {
        Users.updateNickname(u.login, data.nickname, (data) => {
            socket.emit('nicknameChanged', data);
        });
    });

}

function getBattles(io, socket) {
    Battles.getBattles((result) => {
        socket.emit('listBattles', result);
    });
}

function getCurrentBattle(io, socket) {
    let cookie = Utils.getCookie(socket);
    Battles.getBattlesUser(cookie.get("login"), (result) => {
        socket.emit('getCurrentBattle', result);
    });
}

function reConnect(io, socket) {
    let cookie = Utils.getCookie(socket);
    Battles.getBattlesUser(cookie.get("login"), (result) => {
        socket.emit('reConnect', result);
    });
}

function getCountClients(io) {
    io.emit('countUsers', io.engine.clientsCount);
}
