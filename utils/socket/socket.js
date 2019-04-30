const controller = require("../../controllers/sockets");
const Utils = require("../utils");
const state = {
    server: null,
    socket: null
};

exports.set = function (server) {
    state.server = server;
};
exports.get = function () {
    console.log("get " + state.socket);
    return state.socket;
};
exports.init = function () {
    state.socket = require('socket.io')(state.server);
    /**
     * Связываемся по сокету с подключившемся клиентом
     *@param (connection)
     *
     */
    state.socket.on("connection", function (socket) {

        socket.id = Utils.getCookie(socket).get("login");

        socket.on("setRoom", function (data) {
            controller.setRoom(data, state.socket, socket);
        });
        socket.on("changeNickname", function (data) {
            controller.changeNickname(data, state.socket, socket);
        });
        socket.on("getCountUsers", function () {
            controller.getCountClients(state.socket);
        });
        socket.on("getRooms", function (data) {
            controller.getRooms(data, state.socket, socket);
        });
    });

};
