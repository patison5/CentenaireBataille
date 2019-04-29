// GAME APPLICATION CLASS
function Game() {

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

    // GAME MAIN ELEMENTS
    const canvas = document.getElementById('game__container');
    const context = canvas.getContext('2d');

    // TEMPRORARY OPERATIONS
    document.getElementsByClassName('menu__wraper')[0].style.display = 'none';
    canvas.style.display = 'block';
    canvas.style.border = '10px solid #fff';
    canvas.style.backgroundImage = "url('../images/bg1.gif')";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = 'center';
    canvas.style.backgroundRepeat = "no-repeat";


    // GAME MAIN FUNCTIONS
    this.handleKeyDown = function (e) {
        switch (e.keyCode) {
            case KEYCODE_W:
                console.log('moving jump');
                break;

            case KEYCODE_A:
                console.log("moving back");
                break;

            case KEYCODE_D:
                console.log('moving toward');
                break;

            case KEYCODE_S:
                console.log("sit down");
                break;
        }
    };

    this.handleKeyUp = function (e) {
        switch (e.keyCode) {
            case KEYCODE_W:
                console.log('stop moving');
                console.log('');
                break;

            case KEYCODE_A:
                console.log("stop moving");
                console.log('');
                break;

            case KEYCODE_D:
                console.log('stop moving');
                console.log('');
                break;

            case KEYCODE_S:
                console.log("stop moving");
                console.log('');
                break;
        }
    };


    // KEY BINIDINGS
    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;
}