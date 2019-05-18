// const Utils = require("../utils");

class Player {
    constructor (posX = 10, posY = 0) {
        this.health = 100;
        this.posX = 10;
        this.posY = 0;
    }
}

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
        this.numberCLient = 0;  //отправляет номер подключенного клиента - нужно для инициализации позиций игроков
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
        this.numberCLient++;

        this.io.to(this.idGame).emit("connectedBattle", {
            ok: true,
            message: login + " connected !",
            userName: login,
            numberCLient: this.numberCLient
        });
        socket.on("sendData", (data) => {
            data.login = socket.login;
            this.getMessage(data);
        });
    }

    getMessage(data) {
        console.log("data form client...: ", data);
        
        if (data.move !== undefined) {
            this.sendMessage({
                login: data.login,
                move: data.move
            });
        } else {
            this.sendMessage({
                message: "Error input data from Battle"
            });
        }
    }


    // я хочу чтоб ты тут кое-что изменил, чтобы работало!
    disconnect() {
        this.numberCLient--;
        console.log('removing one client')
    }
    // я хочу чтоб ты тут кое-что изменил, чтобы работало!

    sendMessage(message) {
        this.io.to(this.idGame).emit('getData', message);
    }

    getIdGame() {
        return this.idGame;
    }
}

module.exports = Game;