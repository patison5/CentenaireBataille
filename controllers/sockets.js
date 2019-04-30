const Utils = require("../utils/utils");

const socketIo = require("../models/socket");
const Users = require("../models/users");


exports.setRoom = function (data, io, socket) {
    let cookie = Utils.getCookie(socket);
    socket.join(data.serverId, () => {
        io.to(data.serverId).emit('sendRoom', cookie.get("login"));
    });
};

exports.changeNickname = function (data, io, socket) {
    let cookie = Utils.getCookie(socket);

    Users.getUserByToken(cookie.get("token"), function (err, u) {
        Users.updateNickname(u.login, data.nickname);
    });
    socket.emit('nicknameChanged', null);
};

exports.getRooms = function (data, io, socket) {
    let arr = [];


    let rooms = io.sockets.adapter.rooms;
    for (let room in rooms) {
        if (rooms.hasOwnProperty(room)) {
            arr.push(room);
        }
    }

    socket.emit('listRooms', arr);
};

exports.getCountClients = function (io) {
    io.emit('countUsers', io.engine.clientsCount);
};
