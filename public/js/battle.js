// GAME APPLICATION CLASS
function keyListener() {

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
    // document.getElementsByClassName('menu__wraper')[0].style.display = 'none';
    canvas.style.display = 'block';
    canvas.style.border = '10px solid #fff';
    canvas.style.backgroundColor = "rgb(255, 255, 255, 0.25)"
    // canvas.style.backgroundImage = "url('../images/bg1.gif')";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = 'center';
    canvas.style.backgroundRepeat = "no-repeat";


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



class Battle {
    constructor() {
        this.entities = [];

        let player = new Player();
        let enemy = new Enemy();

        this.entities.push(player)
        this.entities.push(enemy)
        this.tick = 0;

        this.render(this.tick);

        // console.log(this.entities)
    }

    update (data) {
        for (let entity in entities) {
            entity.update(data);
        }
    }

    render (tick) {
        setTimeout(() => {
            for (let id in this.entities) {
                this.entities[id].render(tick);
            }

            this.tick++;
            this.render(tick);
        }, 1000 / 60);
    }

}

class Player {
    constructor() {
        this.health = 100;
        this.posX = 0;
        this.posY = 0;
        this.keyListener = new keyListener();

        this.moveVector = [0,0]
    }

    update (data) {
        this.posX = data.player.posX;
    }

    render (tick) {

    }
}

class Enemy {
    constructor() {
        this.health = 100;
        this.posX = 0;
        this.posY = 0;

        this.moveVector = [0,0]
    }

    update (data) {
        this.posX = data.enemy.posX;
    }

    render (tick) {

    }
}


function sprite (options) {
                
    var that = {};
                    
    that.context = options.ctx;
    that.width   = options.width;
    that.height  = options.height;
    that.image   = options.image;

    that.render = function () {

        // Draw the animation
        that.context.drawImage(that.image,
           0,
           0,
           that.width,
           that.height,
           0,
           0,
           that.width,
           that.height);
    };

    return that;
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

    socket.on('getData', function (data) {
        //rerenderCanvas(data);
        
        battle.update(data);

        console.log(data)
    })

    socket.on('connectedBattle', function (data) {
        console.log(data);
    })

    socket.emit("sendData", {
        posX: 10
    });



    const ctx = document.getElementById('game__container').getContext('2d');
    var coinImage = new Image();

    coinImage.src = "/images/coin-sprite-animation.png";

    coinImage.onload = function () {
        var coin = sprite({
            ctx: ctx,
            width: 100,
            height: 100,
            image: coinImage
        });

        coin.render();
    }

  



    let battle = new Battle();

    console.log(battle)

};