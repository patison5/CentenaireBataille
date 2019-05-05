class Game {
    constructor(idGame) {
        const Socket = require("../socket/socket");
        this.idGame = idGame;
        this.socket = Socket.getState().socket;
        this.sockets = new Map();
        this.time = 0;
        this.ticks = 0;
        this.run();
        this.clock();
    }

    clock() {
        setTimeout(() => {
            this.time++;
            this.clock();
        }, 1000);
    }

    run() {
        setTimeout(() => {
            this.ticks++;
            this.run();
        }, 1000 / 60);
    }

    setSocket(socket) {
        socket.on("sendPos", (data) => {
            socket.to(this.idGame).emit('message', data);
            console.log("From1: " + socket.id);
        });
    }

    getMessage(message) {
        console.log("GameId: " + this.idGame + " Message: " + message);
    }

    sendMessage(message) {

    }

    getIdGame() {
        return this.idGame;
    }
}

exports.Game = Game;