$(document).ready(initializeGame)
var playerTank

function initializeGame(){
    playerTank = new Tank( {img: 'images/tankPic.jpeg', xPosition: 0, yPosition: 25} );
    attachEventHandlers();
}

function attachEventHandlers(){
    $(document).keydown(userKeyPresses);
}
function userKeyPresses(event){
    switch(event.which){
        case 37:
            playerTank.moveLeft();
            break;
        case 38: 
            playerTank.moveUp();
            break;
        case 39:
            playerTank.moveRight();
            break;
        case 40:
            playerTank.moveDown();
            break;
        case 32: 
            playerTank.shoot();
            break;
    }
}

class Tank{
    constructor( tankOptions ){
        this.img = tankOptions.img;
        this.xPosition = tankOptions.xPosition;
        this.yPosition = tankOptions.yPosition;
        this.randomID = 'tank' + Math.floor(Math.random() * 1000);
        this.configObj = {'class': 'tank', 
                            id: this.randomID,
                            src: this.img,
                            css: {'top': this.yPosition+'%', left: this.xPosition+'%'},
                            alt: 'tank Img'}
        this.tank = $('<img>', this.configObj);
        $('#mainScreen').append(this.tank);
        this.selector = $('#'+this.randomID);
    }
    shoot(){
        console.log('BANG!');
        debugger;
        var cannonShot = $('<img>', {src: 'images/cannonBall.jpg',
                                        'class': 'cannonBall',
                                        css: {left: this.xPosition + '%',
                                                top: this.yPosition +'%'}
                                        } )
        $('#mainScreen').append(cannonShot);
    }
    moveLeft(){
        this.xPosition -= 1.25;
        this.configObj['css']['left'] = this.xPosition+'%';
        this.selector.css(this.configObj['css']);
        
    }
    moveRight(){
        this.xPosition += 1.25;
        this.configObj['css']['left'] = this.xPosition+'%';
        this.selector.css(this.configObj['css']);
    }
    moveUp(){
        this.yPosition -= 1.25;
        this.configObj['css']['top'] = this.yPosition+'%';
        this.selector.css(this.configObj['css']);
    }
    moveDown(){
        this.yPosition += 1.25;
        this.configObj['css']['top'] = this.yPosition+'%';
        this.selector.css(this.configObj['css']);
    }
    explode(){

    }
}
class CannonBall{
    constructor( cannonBallOptions ){
        this.xPosition = cannonBallOptions.xPosition;
        this.yPosition = cannonBallOptions.yPosition;
        this.configObj = {left: this.xPosition + '%',
                            top: this.yPosition +'%'}
        //this.ball = $('<img>', )
    }
}


class Sound{
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        $('body').append(this.sound);
    }
    play(){
        this.sound.play();
        console.log(src, 'sound is playing');
    }
    stop(){
        this.sound.pause();
    }
}
