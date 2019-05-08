window.onload = function () {
    // GAME MAIN ELEMENTS
    //inintializing container
    var canvas = document.getElementById('game__container');
    var context = canvas.getContext('2d');
    var battle;

    var CANVAS_HEIGHT = 620;
    var CANVAS_WIDTH = 980;


    // TEMPRORARY OPERATIONS
    canvas.style.display = 'block';
    canvas.style.border = '10px solid #fff';
    canvas.style.backgroundColor = "rgb(255, 255, 255, 0.25)"
    // canvas.style.backgroundImage = "url('../images/bg1.gif')";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = 'center';
    canvas.style.backgroundRepeat = "no-repeat";

    // GAME APPLICATION CLASS
    class Battle {
        constructor() {
            this.entities = [];

            let player = new Player();
            let enemy = new Enemy();

            this.entities.push(player)
            this.entities.push(enemy)
            this.tick = 0;


            // начинаем отрисовку игры
            this.render(this.tick);
        }

        update (data) {
            for (let id in this.entities) {
                this.entities[id].update(data);
            }
        }

        render (tick) {
            setTimeout(() => {

                // CLEARGIN CANVVAS
                context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)


                // DRAWING MAIN LINE
                context.strokeStyle = "#202830";
                context.lineWidth = 4;
                context.beginPath();
                context.moveTo(0, CANVAS_HEIGHT-40);
                context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT-40);
                context.stroke();

                for (let id in this.entities) {
                    this.entities[id].render(tick);
                }

                //tmp setup
                let player = this.entities[0];

                if (controller.up && player.jumping == false) {
                    player.velocity_y -= 20;
                    player.jumping = true;
                }

                if (controller.left) {
                    player.velocity_x -= 0.5;
                }
                if (controller.right) {
                    player.velocity_x += 0.5;
                }

                player.velocity_y += 1.5;// gravity
                player.posX += player.velocity_x;
                player.posY += player.velocity_y;
                player.velocity_x *= 0.9;// friction
                player.velocity_y *= 0.9;// friction

                // if player is falling below floor line
                if (player.posY > CANVAS_HEIGHT - 173 - 40) {
                    player.jumping = false;
                    player.posY = CANVAS_HEIGHT - 173 - 40;
                    player.velocity_y = 0;
                }


                // console.log(player.posY)

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
            this.velocity_x = 0;
            this.velocity_y = 0;
            this.jumping = true;
            this.currentAnimationSprite = null;
            this.currentAnimationTitle = "default";


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
                },
                'attacking': {
                    'src': "/images/charackters/model_1/Axe Bandit Attack.png",
                    'width': 640,
                    'height': 80,
                    'numberOfFrames': 8,
                    'ticksPerFrame': 4
                }
            }

            this.setAnimationTo("default");
        }

        setAnimationTo(animationName) {
            var img = new Image();
            img.src = this.animations[animationName].src;

            this.currentAnimationSprite = this.sprite({
                context: context,
                width:  this.animations[animationName].width,
                height: this.animations[animationName].height,
                imageSrc: this.animations[animationName].src,
                image: img,
                numberOfFrames: this.animations[animationName].numberOfFrames,
                ticksPerFrame:  this.animations[animationName].ticksPerFrame
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
            that.imageSrc = options.imageSrc;    

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
            
            that.render = function (entity) {

                // Clear the canvas
                //that.context.clearRect(entity.posX, entity.posY, that.width * 3, that.height * 3);

                // Draw the animation
                that.context.drawImage(
                    that.image,
                    frameIndex * that.width / numberOfFrames,       // отступ перед вырезом по Х
                    0,                                              // отступ перед вырезом по У
                    that.width / numberOfFrames,                    // ширина выреза
                    that.height,                                    // высота выреза
                    entity.posX,                                    // отступ итоговой картинки слева
                    entity.posY,                                    // отступ итоговой картинки сверху
                    that.width / numberOfFrames * 3,                // ширина итоговой картиинки
                    that.height * 3);                               // высота итоговой картинки
            };
            
            return that;
        }

        startAnimation () {
            // this.currentAnimationSprite.image.src = this.currentAnimationSprite.imageSrc;

            this.currentAnimationSprite.update()
            this.currentAnimationSprite.render(this)
        }

        update (data) {
            console.log("fucking updated data:", data)
            // this.posX = data.player.posX + ;
        }

        render (tick) {

            this.startAnimation();
        }
    }

    controller = {
        //KEYS BINDING CODES
        KEYCODE_SPACE: 32,
        KEYCODE_W:     87,
        KEYCODE_A:     65,
        KEYCODE_D:     68,
        KEYCODE_S:     83,

        left:   false,
        right:  false,
        up:     false,

        keyListener:function(event) {

            var key_state = (event.type == "keydown") ? true : false;

            switch(event.keyCode) {

                case controller.KEYCODE_A:
                    controller.left = key_state;
                    console.log('moving left')
                break;
                case controller.KEYCODE_SPACE:
                    console.log('jumping')
                    controller.up = key_state;
                break;
                case controller.KEYCODE_D:
                    console.log('moving right')
                    controller.right = key_state;
                break;

            }

        }

    };



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


        // GAME MAIN FUNCTIONS
        this.handleKeyDown = function (e) {
            switch (e.keyCode) {
                case KEYCODE_W:
                    socket.emit("sendPos", 'moving jump');
                    break;

                case KEYCODE_A:
                    console.log('moving left...')
                    battle.entities[0].posX-=5;

                    battle.entities[0].setAnimationTo('running');

                    socket.emit("sendData", {
                        move: [0,-1]
                    });

                    break;

                case KEYCODE_D:
                    console.log('moving right...')
                    battle.entities[0].posX+=5;

                    

                    if (battle.entities[0].currentAnimationTitle != "running") {
                        console.log("CHANGING ANIMBATION TO RUNNING")
                        console.log(battle.entities[0])
                        battle.entities[0].setAnimationTo('running');
                        console.log(battle.entities[0])
                    }

                    socket.emit("sendData", {
                        move: [0,1]
                    });

                    break;

                case KEYCODE_S:
                    console.log("trying to end the battle....")

                    socket.emit("endBattle", 'moving back');
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
                    battle.entities[0].setAnimationTo('default');
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



    

    class Enemy {
        constructor() {
            this.health = 100;
            this.posX = 0;
            this.posY = 0;

            this.moveVector = [0,0]
        }

        update (data) {
            console.log("fucking updated data:", data)
            // this.posX = data.enemy.posX;
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
            that.width / numberOfFrames * 3,                // ширина итоговой картиинки
            that.height * 3);                               // высота итоговой картинки
        };
        
        return that;
    }



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
        console.log("i get some fucking data!", data)

        if (!data.message)
            battle.update(data);
        else 
            console.log(data.message)
       
    })

    socket.on('connectedBattle', function (data) {
        console.log("Socket on connectedBattle emmited!")
        console.log(data);
    })



    // jобработка клавишных событий
    //keyListener()
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);

};