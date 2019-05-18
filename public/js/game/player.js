class Player extends Character {

    name = "Player";
    
    startAnimation () {
        this.currentAnimationSprite.update()
        this.currentAnimationSprite.render(this)
    }

    update (data) {
        // console.log("Player is updating:", data)

        this.posX                 = data.player_posX;
        this.posY                 = data.player_posY;
        this.direction_x          = data.player_direction_x;
        this.velocity_x           = data.player_velocity_x;
        this.velocity_y           = data.player_velocity_y;
        this.attacking            = data.attacking;
        this.currentAnimationOnce = data.currentAnimOnce;

        if (data.attacking === true)
            this.changeAtackingBoolTimer();
    }

    render (tick) {
        this.startAnimation();
    }
}