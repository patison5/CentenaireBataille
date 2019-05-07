// GAME MAIN ELEMENTS
var canvas;
var context;
var battle;

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
                // socket.emit("sendPos", 'moving toward');
                battle.entities[0].posX+=2;
                // console.log(battle.entities[0])
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
        this.posX = 10;
        this.posY = 0;
        this.keyListener = new keyListener();

        this.moveVector = [0,0]

        this.animations = {
            'default': {
                'src': "/images/charackters/model_1/Axe Bandit.png",
                'width': 480,
                'height': 80,
                'numberOfFrames': 6,
                'ticksPerFrame': 4
            },

            'running': {
                'src': "/images/charackters/model_1/axe bandit run.png",
                'width': 640,
                'height': 80,
                'numberOfFrames': 8,
                'ticksPerFrame': 4
            }
        }

        this.currentAnimationSprite = this.sprite({
            context: context,
            width:  this.animations['default'].width,
            height: this.animations['default'].height,
            image: new Image(),
            numberOfFrames: this.animations['default'].numberOfFrames,
            ticksPerFrame:  this.animations['default'].ticksPerFrame
        });
    }

    sprite (options) {
        
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;
        
        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
        that.posX = this.posX;
        

        that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;
                
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {  
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
        
        that.render = function () {

          // Clear the canvas
          that.context.clearRect(that.posX, 600 - that.height * 3 + 60, that.width * 3, that.height * 3);
          
          // Draw the animation
          that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,       // отступ перед вырезом по Х
            0,                                              // отступ перед вырезом по У
            that.width / numberOfFrames,                    // ширина выреза
            that.height,                                    // высота выреза
            that.posX,                                      // отступ итоговой картинки слева
            600 - that.height * 3 + 60,                     // отступ итоговой картинки сверху
            that.width / numberOfFrames * 3,                // ширина итоговой картиинки
            that.height * 3);                               // высота итоговой картинки
        };
        
        return that;
    }

    startAnimation () {
        // Load sprite sheet
        let playerImg = new Image();
        this.currentAnimationSprite.image.src = this.animations['default'].src;
        
        this.currentAnimationSprite.update()
        this.currentAnimationSprite.render()
    }

    update (data) {
        this.posX = data.player.posX;
    }

    render (tick) {
        // console.log('tick')

        this.startAnimation();
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
    
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    
    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;
            
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {  
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
    
    that.render = function () {
    
      // Clear the canvas
      that.context.clearRect(0, 600 - that.height * 3 + 60, that.width * 3, that.height * 3);
      
      // Draw the animation
      that.context.drawImage(
        that.image,
        frameIndex * that.width / numberOfFrames,       // отступ перед вырезом по Х
        0,                                              // отступ перед вырезом по У
        that.width / numberOfFrames,                    // ширина выреза
        that.height,                                    // высота выреза
        0,                                              // отступ итоговой картинки слева
        600 - that.height * 3 + 60,                     // отступ итоговой картинки сверху
        that.width / numberOfFrames * 3,                    // ширина итоговой картиинки
        that.height * 3);                                   // высота итоговой картинки
    };
    
    return that;
}

window.onload = function () {

    //inintializing container
    canvas = document.getElementById('game__container');
    context = canvas.getContext('2d');

    // запускаем батл
    battle = new Battle();

    let url = window.location.href;
    let arrUrl = url.split("/");
    let socketUrl = arrUrl[0] + "//" + arrUrl[2];

    let data = {
        battleId: getParamUrl("battle")
    };

    let ping = Date.now();

    socket = io.connect(socketUrl);

    socket.emit("getID");
    socket.emit("connectBattle", data);


    socket.emit("sendData", {
        posX: 10
    });


    socket.on("getID", function (data) {
        console.log("ID: " + data);
    });

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

    var playerImg = new Image();

    var playerSprite = sprite({
        context: context,
        width: 640,
        height: 80,
        image: playerImg,
        numberOfFrames: 8,
        ticksPerFrame: 6
    });

    console.log("1:", playerSprite)
    // Load sprite sheet
    // playerImg.addEventListener("load", startAnimation);
    // playerImg.src = "/images/coin-sprite-animation.png";
    playerImg.src = "/images/charackters/model_1/axe bandit run.png";


    function startAnimation () {
    
      window.requestAnimationFrame(startAnimation);
      
      playerSprite.update();
      playerSprite.render();
    }



};