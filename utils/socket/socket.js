const controller = require("../../controllers/sockets");

const state = {
    server: null,
    socket: null
};

module.exports = {
    set(server) {
        state.server = server;
    },

    getState() {
        return state;
    },

    init(callback) {
        state.socket = require('socket.io')(state.server);
        /**
         * Связываемся по сокету с подключившемся клиентом
         *@param (connection)
         *
         */
        state.socket.on("connection", function (socket) {
            controller.call(state.socket, socket);
        });
        callback("Socket listening");
    }
};
