// GAME APPLICATION CLASS
class Battle {
    constructor(player = {}, enemy = {}) {
        this.context = document.getElementById('game__container').getContext('2d');

        this.world = new Battle.World();

        this.world.WIDTH  = document.getElementById('game__container').width;
        this.world.HEIGHT = document.getElementById('game__container').height;

        this.userName = null;
        this.idNumber = null; // нужен для удостоверения личности игрока - номер зашедшего игрока

        this.entities = [];

        this.tick = 0;
        this.currentTime = 90;

        console.log(document.getElementById('game__container').width)
    }

    startGameTimer () {
        setTimeout(() => {
            this.currentTime--;

            if (this.currentTime == 0)
                alert("game finished!");
            else 
                this.startGameTimer();
        }, 1000)
    }

    drawPlayersInfo () {
        this.context.font = "25px Arial";
        this.context.color = "#fff";
        this.context.strokeStyle = "rgb(154, 59, 59)";
        this.context.lineWidth = 20;
        this.context.fillStyle = "#ffffff";

        this.context.fillText("Player", 20, 30);
        this.context.beginPath();
        this.context.moveTo(20, 60);
        this.context.lineTo(this.player.health*3, 60);
        this.context.stroke();


        this.context.fillText("Enemy", this.world.WIDTH - 100, 30);
        this.context.beginPath();
        this.context.moveTo(this.world.WIDTH - this.enemy.health*3, 60);
        this.context.lineTo(this.world.WIDTH - 20, 60);
        this.context.stroke();  
    }


    drawGameTimer () {
        this.context.font = "40px Arial";
        this.context.color = "#fff";
        this.context.fillStyle = "#ffffff";
        this.context.fillText(this.currentTime, this.world.WIDTH / 2, 60);
    }


    startBattle () {
        // начинаем отрисовку игры
        console.log('starting that fucking game')

        if (this.idNumber % 2 == 0) {
            this.player = new Player("player", this.context, 10, 600);
            this.enemy  = new Enemy ("Enemy",  this.context, 300, 600);

            console.log('you are the number ', this.idNumber)
        } else {
            console.log('you are the number ', this.idNumber)

            this.player = new Player("player", this.context, 300, 600);
            this.enemy  = new Enemy ("Enemy",  this.context, 10, 600);
        }

        this.entities.push(this.player)
        this.entities.push(this.enemy)

        this.enemy.health = 60;

        this.render(this.tick);

        this.startGameTimer() //стартуем таймер игры
    } 

    update (data) {

        if (data.login == this.userName) {
            // console.log("updating player")
        } else {
            // console.log("updating enemy");
            this.enemy.update(data.move)
            // console.log(data.move)
        }
    }

    render (tick) {
        setTimeout(() => {

            // CLEARGIN CANVVAS
            this.context.clearRect(0, 0, this.world.WIDTH, this.world.HEIGHT)

            // DRAWING MAIN LINE
            this.context.strokeStyle = "#202830";
            this.context.lineWidth = 4;
            this.context.beginPath();
            this.context.moveTo(0, this.world.HEIGHT-40);
            this.context.lineTo(this.world.WIDTH, this.world.HEIGHT-40);
            this.context.stroke();

            this.drawPlayersInfo();
            this.drawGameTimer();

            

            //tmp setup
            let player = this.entities[0];
            // let enemy  = this.entities[1];

            if (controller.attack && player.attacking == false) {
                this.player.attacking = true;
                this.player.changeAtackingBoolTimer();

                socket.emit("sendData", {
                    move: {
                        player_direction_x: player.direction_x,
                        player_velocity_x:  player.velocity_x,
                        player_velocity_y:  player.velocity_y,
                        player_posX:        player.posX, 
                        player_posY:        player.posY,
                        user_name:          this.userName,
                        currentAnimOnce:    player.currentAnimationOnce,
                        attacking:          true
                    }
                });
            } else {
                if (controller.up && player.jumping == false) {
                    player.velocity_y -= 20;
                    player.jumping = true;

                    socket.emit("sendData", {
                        move: {
                            player_direction_x: player.direction_x,
                            player_velocity_x:  player.velocity_x,
                            player_velocity_y:  player.velocity_y,
                            player_posX:        player.posX, 
                            player_posY:        player.posY,
                            user_name:          this.userName,
                            currentAnimOnce:    player.currentAnimationOnce,
                            attacking:          controller.attack
                        }
                    });
                }

                if (controller.left) {
                    player.direction_x = -1;
                    player.velocity_x -= 0.5;

                    console.log(controller.attack)

                    socket.emit("sendData", {
                        move: {
                            player_direction_x: player.direction_x,
                            player_velocity_x:  player.velocity_x,
                            player_velocity_y:  player.velocity_y,
                            player_posX:        player.posX, 
                            player_posY:        player.posY,
                            user_name:          this.userName,
                            currentAnimOnce:    player.currentAnimationOnce,
                            attacking:          controller.attack
                        }
                    });
                }

                if (controller.right) {
                    player.direction_x = 1;
                    player.velocity_x += 0.5;

                    console.log("player.posX: ", player.posX)

                    socket.emit("sendData", {
                        move: {
                            player_direction_x: player.direction_x,
                            player_velocity_x:  player.velocity_x,
                            player_velocity_y:  player.velocity_y,
                            player_posX:        player.posX, 
                            player_posY:        player.posY,
                            user_name:          this.userName,
                            currentAnimOnce:    player.currentAnimationOnce,
                            attacking:          controller.attack
                        }
                    });
                }

            }

            


            // if (this.player.attacking)
            //     console.log(this.player.attacking)

            // if (this.enemy.attacking)
            //     console.log(this.enemy.attacking)
            

            // обработка обоих игроков - добавление физики и анимаций
            for (let id in this.entities) {
                let charachter = this.entities[id];

                charachter.velocity_y += this.world.gravity;// gravity
                charachter.posX += charachter.velocity_x;
                charachter.posY += charachter.velocity_y;

                charachter.velocity_x *= this.world.friction;// friction
                charachter.velocity_y *= this.world.friction;// friction

                // if charachter is falling below floor line
                // эти ебанутые числа нужно убрать после применения translate к canvas...
                if (charachter.posY > this.world.HEIGHT - 173 - 40) {
                    charachter.jumping = false;
                    charachter.posY = this.world.HEIGHT - 173 - 40;
                    charachter.velocity_y = 0;
                }

                // if charachter is falling below floor line
                if (charachter.posX >= this.world.WIDTH) {
                    charachter.posX = this.world.WIDTH - 200;
                    charachter.velocity_x = 0;
                    console.log('коснулся правой стены!')
                }

                // if charachter is falling below floor line
                if (charachter.posX <= -80) {
                    charachter.posX = -80;
                    charachter.velocity_x = 0;
                    console.log('коснулся левой стены!')
                }


                if (!charachter.attacking) {
                    if (charachter.direction_x < 0) {
                        if (charachter.velocity_x < -0.4) {
                            if (charachter.currentAnimationTitle != "running_reverse"){
                                // console.log('moving left')
                                charachter.currentAnimationTitle = "running_reverse";
                                charachter.setAnimationTo('running_reverse');
                            }
                        } else {
                            if (charachter.currentAnimationTitle != "default_reverse"){
                                // console.log('staying animation...')
                                charachter.currentAnimationTitle = "default_reverse";
                                charachter.setAnimationTo('default_reverse');
                            }
                        }
                    } else if (charachter.direction_x > 0) {
                        if (charachter.velocity_x > 0.4) {
                            if (charachter.currentAnimationTitle != "running"){
                                // console.log('moving left')
                                charachter.currentAnimationTitle = "running";
                                charachter.setAnimationTo('running');
                            }
                        } else {
                            if (charachter.currentAnimationTitle != "default"){
                                // console.log('staying animation...')
                                charachter.currentAnimationTitle = "default";
                                charachter.setAnimationTo('default');
                            }
                        }
                    }
                }



                //setting animation onle once...
                if (charachter.attacking && !charachter.currentAnimationOnce) {
                    charachter.currentAnimationTitle = "attacking";
                    charachter.currentAnimationOnce  = true;
                    charachter.setAnimationTo('attacking', true);
                }
            }

                       


            for (let id in this.entities) {
                this.entities[id].render(tick);
            }

            this.tick++;
            this.render(tick);
        }, 1000 / 60);
    }

}



Battle.World = function(friction = 0.8, gravity = 2) {
    this.HEIGHT = 620;
    this.WIDTH  = 980;
    this.friction = friction;
    this.gravity  = gravity;
}