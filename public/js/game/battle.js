// GAME APPLICATION CLASS
class Battle {
    constructor() {
        this.entities = [];

        this.world = new Battle.World();

        this.context = document.getElementById('game__container').getContext('2d');

        let player = new Player("player", this.context);
        let enemy = new Enemy("Enemy", this.context, 300, 0);

        this.entities.push(player)
        this.entities.push(enemy)


        console.log(enemy)
        console.log(player)


        this.tick = 0;
    }

    startBattle () {
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
            }

            if (controller.left) {
                player.direction_x = -1;
                player.velocity_x -= 0.5;
            }

            if (controller.right) {
                player.direction_x = 1;
                player.velocity_x += 0.5;
            }

            
            //тестовая строчка для противника
            this.entities[1].velocity_x += 0.3;


            // обработка обоих игроков - добавление физики и анимаций
            for (let id in this.entities) {
                let charachter = this.entities[id];

                charachter.velocity_y += 1.5;// gravity
                charachter.posX += charachter.velocity_x;
                charachter.posY += charachter.velocity_y;
                charachter.velocity_x *= 0.9;// friction
                charachter.velocity_y *= 0.9;// friction

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
                }

                // if charachter is falling below floor line
                if (charachter.posX <= -80) {
                    charachter.posX = -80;
                    charachter.velocity_x = 0;

                    console.log(charachter.posX)
                }



                if (charachter.direction_x < 0) {
                    if (charachter.velocity_x < -0.4) {
                        if (charachter.currentAnimationTitle != "running"){
                            console.log('moving left')
                            charachter.currentAnimationTitle = "running";
                            charachter.setAnimationTo('running');
                        }
                    } else {
                        if (charachter.currentAnimationTitle != "default"){
                            console.log('staying animation...')
                            charachter.currentAnimationTitle = "default";
                            charachter.setAnimationTo('default');
                        }
                    }
                } else if (charachter.direction_x > 0) {
                    if (charachter.velocity_x > 0.4) {
                        if (charachter.currentAnimationTitle != "running"){
                            console.log('moving left')
                            charachter.currentAnimationTitle = "running";
                            charachter.setAnimationTo('running');
                        }
                    } else {
                        if (charachter.currentAnimationTitle != "default"){
                            console.log('staying animation...')
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
}