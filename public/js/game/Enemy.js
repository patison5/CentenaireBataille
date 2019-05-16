class Enemy extends Character {

    name = "Enemy";
    
    startAnimation () {
        // this.currentAnimationSprite.image.src = this.currentAnimationSprite.imageSrc;

        this.currentAnimationSprite.update()
        this.currentAnimationSprite.render(this)
    }

    update (data) {
        this.posX           = data.player_posX;
        this.posY           = data.player_posY;
        this.direction_x    = data.player_direction_x;
        this.velocity_x     = data.player_velocity_x;
        this.velocity_y     = data.player_velocity_y;
    }

    render (tick) {
        this.startAnimation();
    }
}