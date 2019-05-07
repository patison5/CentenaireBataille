const Utils = require("../utils");

class Game {
    constructor(idGame) {
        const Socket = require("../socket/socket");
        this.idGame = idGame;
        this.io = Socket.getState().socket;
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

    setSocket(socket, login) {
        this.sockets.set(login, socket);
        socket.join(this.idGame);
        socket.login = login;
        this.io.to(this.idGame).emit("connectedBattle", {
            ok: true,
            message: login + " connected !"
        });
        socket.on("sendData", (data) => {
            data.login = socket.login;
            this.getMessage(data);
        });
    }

    getMessage(data) {
        if (data.move !== undefined) {
            this.sendMessage({
                login: data.login,
                move: data.move
            });
        }
    }

    sendMessage(message) {
        this.io.to(this.idGame).emit('getData', message);
    }

    getIdGame() {
        return this.idGame;
    }
}

module.exports = Game;