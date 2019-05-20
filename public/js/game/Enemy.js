class Enemy extends Character {

    name = "Enemy";

    animations = {

        'default': {
            'src': "/images/p1/default.png",
            'width': 254,
            'height': 106,
            'numberOfFrames': 5,
            'ticksPerFrame': 4
        },
        'running': {
            'src': "/images/p1/run.png",
            'width': 384,
            'height': 106,
            'numberOfFrames': 7,
            'ticksPerFrame': 4
        },
        'attacking': {
            'src': "/images/p1/hit.png",
            'width': 482,
            'height': 106,
            'numberOfFrames': 7,
            'ticksPerFrame': 4
        },

        'default_reverse': {
            'src': "/images/p1/reversedefault.png",
            'width': 254,
            'height': 106,
            'numberOfFrames': 5,
            'ticksPerFrame': 4
        },

        'running_reverse': {
            'src': "/images/p1/reverserun.png",
            'width': 384,
            'height': 106,
            'numberOfFrames': 7,
            'ticksPerFrame': 4
        },
       'attacking': {
            'src': "/images/p1/reversehit.png",
            'width': 484,
            'height': 106,
            'numberOfFrames': 7,
            'ticksPerFrame': 4
        }


        // old animations...
        // 'default': {
        //     'src': "/images/charackters/model_1/right-stay.png",
        //     'width': 480,
        //     'height': 80,
        //     'numberOfFrames': 6,
        //     'ticksPerFrame': 4
        // },


        // 'running': {
        //     'src': "/images/charackters/model_1/right-run.png",
        //     'width': 640,
        //     'height': 80,
        //     'numberOfFrames': 8,
        //     'ticksPerFrame': 4
        // },
        // 'attacking': {
        //     'src': "/images/charackters/model_1/right-attack.png",
        //     'width': 640,
        //     'height': 80,
        //     'numberOfFrames': 8,
        //     'ticksPerFrame': 4
        // },

        // 'default_reverse': {
        //     'src': "/images/charackters/model_1/left-stay.png",
        //     'width': 480,
        //     'height': 80,
        //     'numberOfFrames': 6,
        //     'ticksPerFrame': 4
        // },

        // 'running_reverse': {
        //     'src': "/images/charackters/model_1/left-run.png",
        //     'width': 640,
        //     'height': 80,
        //     'numberOfFrames': 8,
        //     'ticksPerFrame': 4
        // },
        // 'attacking_reverse': {
        //     'src': "/images/charackters/model_1/left-attack.png",
        //     'width': 640,
        //     'height': 80,
        //     'numberOfFrames': 8,
        //     'ticksPerFrame': 4
        // }
    }
    
    startAnimation () {
        if (this.currentAnimationSprite) {
            this.currentAnimationSprite.update()
            this.currentAnimationSprite.render(this)
        }
    }

    update (data) {
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