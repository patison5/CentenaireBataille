class SocketGame {
    constructor(socket) {
        this.socket = socket;
        this.socket.on("sendData", () => {
        });
    }

    /*
    onEvent(event, callback)
    {
        this.socket.on(event,(data)=>{
            callback(data);
        });
    }*/
}