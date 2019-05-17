window.onload = function () {
    // GAME MAIN ELEMENTS
    //inintializing container
    var canvas = document.getElementById('game__container');
    var context = canvas.getContext('2d');
    var battle;

    // TEMPRORARY OPERATIONS
    canvas.style.display = 'block';
    canvas.style.border = '10px solid #fff';
    canvas.style.backgroundColor = "rgb(255, 255, 255, 0.25)"
    // canvas.style.backgroundImage = "url('../images/bg1.gif')";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = 'center';
    canvas.style.backgroundRepeat = "no-repeat";

    controller = {
        //KEYS BINDING CODES
        KEYCODE_SPACE: 32,
        KEYCODE_W:     87,
        KEYCODE_A:     65,
        KEYCODE_D:     68,
        KEYCODE_S:     83,
        KEYCODE_ENTER: 13,

        left:   false,
        right:  false,
        up:     false,
        attack: false,

        keyListener:function(event) {

            var key_state = (event.type == "keydown") ? true : false;

            switch(event.keyCode) {

                case controller.KEYCODE_A:
                    controller.left = key_state;
                break;

                case controller.KEYCODE_SPACE:
                    controller.up = key_state;
                break;

                case controller.KEYCODE_ENTER:
                    controller.attack = key_state;
                break;

                case controller.KEYCODE_D:
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

    startFrontSocket(battle);

    battle.startBattle();


    // jобработка клавишных событий
    //keyListener()
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);

};