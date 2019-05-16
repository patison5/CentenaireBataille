// GAME APPLICATION CLASS
class Battle {
    constructor() {
        this.userName = null;

        this.entities = [];

        this.world = new Battle.World();

        this.context = document.getElementById('game__container').getContext('2d');

        this.player = new Player("player", this.context);
        this.enemy = new Enemy("Enemy", this.context, 300, 0);

        this.entities.push(this.player)
        this.entities.push(this.enemy)


        console.log(this.enemy)
        console.log(this.player)


        this.tick = 0;
    }

    startBattle () {
        // начинаем отрисовку игры
        this.render(this.tick);
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

            

            //tmp setup
            let player = this.entities[0];
            // let enemy  = this.entities[1];

            if (controller.up && player.jumping == false) {
                player.velocity_y -= 20;
                player.jumping = true;

                socket.emit("sendData", {
                    move: {
                        player_direction_x: player.direction_x,
                        player_velocity_x: player.velocity_x,
                        player_velocity_y: player.velocity_y,
                        player_posX: player.posX, 
                        player_posY: player.posY,
                        user_name: this.userName
                    }
                });
            }

            if (controller.left) {
                player.direction_x = -1;
                player.velocity_x -= 0.5;

                socket.emit("sendData", {
                    move: {
                        player_direction_x: player.direction_x,
                        player_velocity_x: player.velocity_x,
                        player_velocity_y: player.velocity_y,
                        player_posX: player.posX, 
                        player_posY: player.posY,
                        user_name: this.userName
                    }
                });
            }

            if (controller.right) {
                player.direction_x = 1;
                player.velocity_x += 0.5;

                socket.emit("sendData", {
                    move: {
                        player_direction_x: player.direction_x,
                        player_velocity_x: player.velocity_x,
                        player_velocity_y: player.velocity_y,
                        player_posX: player.posX, 
                        player_posY: player.posY,
                        user_name: this.userName
                    }
                });
            }

            
            //тестовая строчка для противника
            // this.entities[1].velocity_x = this.entities[1].velocity_x + this.entities[1].direction_x * 0.3;


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
                if (charachter.posX >= this.world.WIDTH -200) {
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

                if (charachter.direction_x < 0) {
                    console.log(this.entities[1].velocity_x)
                    
                    if (charachter.velocity_x < -0.4) {

                        if (charachter.currentAnimationTitle != "running_reverse"){
                            console.log('moving left')
                            charachter.currentAnimationTitle = "running_reverse";
                            charachter.setAnimationTo('running_reverse');

                            console.log(charachter.currentAnimationTitle)
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
                        // console.log(this.entities[1].velocity_x)

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