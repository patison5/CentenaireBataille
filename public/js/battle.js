// GAME APPLICATION CLASS
function Battle() {

    //KEYS BINDING CODES
    const KEYCODE_ENTER = 13;
    const KEYCODE_SPACE = 32;
    const KEYCODE_ARROW_UP = 38;
    const KEYCODE_ARROW_DOWN = 40;
    const KEYCODE_ARROW_LEFT = 37;
    const KEYCODE_ARROW_RIGHT = 39;
    const KEYCODE_W = 87;
    const KEYCODE_A = 65;
    const KEYCODE_D = 68;
    const KEYCODE_S = 83;

    // GAME MAIN ELEMENTS
    const canvas = document.getElementById('game__container');
    const context = canvas.getContext('2d');

    // TEMPRORARY OPERATIONS
    /* document.getElementsByClassName('menu__wraper')[0].style.display = 'none';
     canvas.style.display = 'block';
     canvas.style.border = '10px solid #fff';
     canvas.style.backgroundImage = "url('../images/bg1.gif')";
     canvas.style.backgroundSize = "cover";
     canvas.style.backgroundPosition = 'center';
     canvas.style.backgroundRepeat = "no-repeat";*/


    // GAME MAIN FUNCTIONS
    this.handleKeyDown = function (e) {
        switch (e.keyCode) {
            case KEYCODE_W:
                socket.emit("sendPos", 'moving jump');
                break;

            case KEYCODE_A:
                socket.emit("endBattle", 'moving back');
                break;

            case KEYCODE_D:
                socket.emit("sendPos", 'moving toward');
                break;

            case KEYCODE_S:
                socket.emit("sendPos", "sit down");
                break;
        }
    };

    this.handleKeyUp = function (e) {
        switch (e.keyCode) {
            case KEYCODE_W:
                socket.emit("sendPos", 'stop moving');
                break;

            case KEYCODE_A:
                socket.emit("sendPos", "stop moving");
                break;

            case KEYCODE_D:
                socket.emit("sendPos", 'stop moving');
                break;

            case KEYCODE_S:
                socket.emit("sendPos", "stop moving");
                break;
        }
    };



    // KEY BINIDINGS
    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;
}

function getParamUrl(param) {
    let params = window
        .location
        .search
        .replace('?', '')
        .split('&')
        .reduce(
            function (p, e) {
                let a = e.split('=');
                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );
    return params[param];
}

window.onload = function () {

    let url = window.location.href;
    let arrUrl = url.split("/");
    let socketUrl = arrUrl[0] + "//" + arrUrl[2];

    socket = io.connect(socketUrl);
    socket.emit("getID");
    socket.on("getID", function (data) {
        console.log("ID: " + data);
    });

    let data = {
        battleId: getParamUrl("battle")
    };

    socket.emit("connectBattle", data);

    let ping = Date.now();

    socket.on("message", function (data) {
        let now = Date.now();
        console.log("Ping: " + (now - ping));
        ping = now;
        console.log(data);
    });
    socket.on("endBattle", function (data) {
        console.log(data);
    });
    let game = new Battle();

};