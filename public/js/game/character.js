class Character {
	constructor(type, context, posX = 10, posY = 0) {
        this.health = 100;
        this.posX = posX;
        this.posY = posY;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.jumping = true;
        this.attacking = false;
        this.currentAnimationSprite = null;
        this.currentAnimationTitle = "default";
        this.currentAnimationOnce = false;
        this.context = context;
        this.direction_x = 1;
        this.tmpSpriteImg = new Image();

        this.animations = {
            'default': {
                'src': "/images/charackters/model_1/right-stay.png",
                'width': 480,
                'height': 80,
                'numberOfFrames': 6,
                'ticksPerFrame': 4
            },

            // 'default': {
            //     'src': "/images/pers 2/reaction.png",
            //     'width': 279,
            //     'height': 109,
            //     'numberOfFrames': 5,
            //     'ticksPerFrame': 4
            // },

            'running': {
                'src': "/images/charackters/model_1/right-run.png",
                'width': 640,
                'height': 80,
                'numberOfFrames': 8,
                'ticksPerFrame': 4
            },
            'attacking': {
                'src': "/images/charackters/model_1/right-attack.png",
                'width': 640,
                'height': 80,
                'numberOfFrames': 8,
                'ticksPerFrame': 4
            },

            'default_reverse': {
                'src': "/images/charackters/model_1/left-stay.png",
                'width': 480,
                'height': 80,
                'numberOfFrames': 6,
                'ticksPerFrame': 4
            },

            'running_reverse': {
                'src': "/images/charackters/model_1/left-run.png",
                'width': 640,
                'height': 80,
                'numberOfFrames': 8,
                'ticksPerFrame': 4
            },
            'attacking_reverse': {
                'src': "/images/charackters/model_1/left-attack.png",
                'width': 640,
                'height': 80,
                'numberOfFrames': 8,
                'ticksPerFrame': 4
            }
        }

        this.setAnimationTo("default");
    }

    changeAtackingBoolTimer () {
        setTimeout(() => {
            console.log('changin attacking value back to false;')
            this.attacking = false;
            this.currentAnimationOnce = false;
        }, 1000)
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setAnimationTo(animationName, once = false) {
        this.tmpSpriteImg.src = this.animations[animationName].src;

        console.log('setting animations to', animationName, once)

        this.currentAnimationSprite = this.sprite({
            context:        this.context,
            width:          this.animations[animationName].width,
            height:         this.animations[animationName].height,
            imageSrc:       this.animations[animationName].src,
            numberOfFrames: this.animations[animationName].numberOfFrames,
            ticksPerFrame:  this.animations[animationName].ticksPerFrame,
            image:          this.tmpSpriteImg,
            once:           once
        });
    }

    sprite (options) {
        
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame  = options.ticksPerFrame  || 0,
            numberOfFrames = options.numberOfFrames || 1;
        
        that.context    = options.context;
        that.width      = options.width;
        that.height     = options.height;
        that.image      = options.image;  
        that.imageSrc   = options.imageSrc; 
        that.once       = options.once;

        that.stopAnimation = false;  

        console.log('playing for once? :',  that.once)
        console.log("stopAnimation",        that.stopAnimation)

        that.update = function () {

            if (!that.stopAnimation) {
                tickCount += 1;

                if (tickCount > ticksPerFrame) {
                    tickCount = 0;
                    
                    // If the current frame index is in range
                    if (frameIndex < numberOfFrames - 2) {  
                        // Go to the next frame
                        frameIndex += 1;
                    } else {
                        if(that.once){
                            that.stopAnimation = true;
                            console.log('stoping animation for once effect')
                        }

                        frameIndex = 0;
                    }
                }
            }
        };
        
        that.render = function (entity) {
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
}