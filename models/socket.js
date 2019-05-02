const socket = require("../utils/socket/socket");


exports.get = function () {
    return socket.get();
};
exports.getRooms = function () {
    return socket.state().socket.sockets.adapter.rooms;
};
exports.getCountClients = function () {
    return socket.clientsCount;
};
exports.getRoomsAndClients = async function () {
    let arr = [];
    let rooms = socket.state().socket.sockets.adapter.rooms;
    for (let room in rooms) {
        if (rooms.hasOwnProperty(room)) {
            socket.state().socket.in(room).clients(function (err, clients) {
                arr.push({room, clients});
            });
        }
    }
    return arr;
};
