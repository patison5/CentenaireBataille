const socket = require("../utils/socket/socket");

exports.get = function () {
    return socket.get();
};
exports.getRooms = function () {
    return socket.rooms;
};
exports.getCountClients = function () {
    return socket.clientsCount;
};