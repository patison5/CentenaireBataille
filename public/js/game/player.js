class Player extends Character {

    name = "Player";

    animations = {
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