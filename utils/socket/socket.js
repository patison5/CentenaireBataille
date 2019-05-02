const controller = require("../../controllers/sockets");
let state = {
    server: null,
    socket: null
};

exports.state = function () {
    return state;
};

exports.set = function (server) {
    state.server = server;
};
exports.get = function () {
    return state.socket;
};

exports.init = function (callback) {
    state.socket = require('socket.io')(state.server);
    /**
     * Связываемся по сокету с подключившемся клиентом
     *@param (connection)
     *
     */
    state.socket.on("connection", function (socket) {
        socket.on("getID", function () {
            controller.getID(socket);
        });
        socket.on("createBattle", function (data) {
            controller.createBattle(data, state.socket, socket);
        });
        socket.on("enterBattle", function (data) {
            controller.enterBattle(data, state.socket, socket);
        });
        socket.on("connectBattle", function (data) {
            controller.connectBattle(data, state.socket, socket);
        });
        socket.on("sendPos", function (data) {
            controller.sendPos(data, state.socket, socket);
        });
        socket.on("endBattle", function (data) {
            controller.endBattle(data, state.socket, socket);
        });
        socket.on("changeNickname", function (data) {
            controller.changeNickname(data, state.socket, socket);
        });
        socket.on("getCountUsers", function () {
            controller.getCountClients(state.socket, socket);
        });
        socket.on("listBattles", function () {
            controller.getBattles(state.socket, socket);
        });
        socket.on('disconnect', function () {
            console.log('Got disconnect: ' + socket.id);
        });
    });
    callback("Socket listening");
};
