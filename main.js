$(document).ready(initializeGame)
var playerTank
var shotsFired = [];

function initializeGame(){
    playerTank = new Tank( {img: 'images/tankPic.jpeg', xPosition: 0, yPosition: 25, angleOfDirection: 0} );
    attachEventHandlers();
}

function attachEventHandlers(){
    $(document).keydown(userKeyPresses);
}
function userKeyPresses(event){
    switch(event.which){
        case 37:
            playerTank.turnLeft();
            break;
        case 38: 
            playerTank.moveForward(playerTank.selector);
            break;
        case 39:
            playerTank.turnRight();
            break;
        case 40:
            playerTank.moveDown();
            break;
        case 32: 
            playerTank.shoot();
            break;
    }
}

class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
    }
    moveForward(selector){
        this.xPosition = Math.cos(this.angleOfDirection) * 10;
        this.yPosition = Math.sin(this.angleOfDirection) * 10;
        this.configObj['css']['left'] = this.xPosition + '%';
        this.configObj['css']['top'] = this.yPosition + '%';
        selector.css(this.configObj['css']);
    }
}
class Tank extends ScreenObjects{
    constructor( tankOptions ){
        super(tankOptions);
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
        shotsFired.push(new CannonBall( {xPosition: this.xPosition, 
                                        yPosition: this.yPosition, 
                                        img: 'images/cannonBall.jpg',} ));
        console.log(shotsFired[0])
    }
    turnLeft(){
        this.angleOfDirection -= 10;
        this.configObj['css']['transform'] = 'rotate('+this.angleOfDirection+'deg)';
        this.selector.css(this.configObj['css']);
    }
    turnRight(){
        this.angleOfDirection += 10;
        this.configObj['css']['transform'] = 'rotate('+this.angleOfDirection+'deg)';
        this.selector.css(this.configObj['css']);
    }
    moveReverse(){

    }
    // moveLeft(){
    //     this.xPosition -= 1.25;
    //     this.configObj['css']['left'] = this.xPosition+'%';
    //     this.selector.css(this.configObj['css']);
        
    // }
    // moveRight(){
    //     this.xPosition += 1.25;
    //     this.configObj['css']['left'] = this.xPosition+'%';
    //     this.selector.css(this.configObj['css']);
    // }
    // moveUp(){
    //     this.yPosition -= 1.25;
    //     this.configObj['css']['top'] = this.yPosition+'%';
    //     this.selector.css(this.configObj['css']);
    // }
    // moveDown(){
    //     this.yPosition += 1.25;
    //     this.configObj['css']['top'] = this.yPosition+'%';
    //     this.selector.css(this.configObj['css']);
    // }

}



class CannonBall extends ScreenObjects{
    constructor( cannonBallOptions ){
        super(cannonBallOptions);
        this.randomID = 'cannonball' + Math.floor(Math.random() * 1000);
        this.configObj = {'class': 'cannonBall',
                            id: this.randomID,
                            src: this.img,
                            css: {'left': this.xPosition + '%',
                                    'top': this.yPosition +'%'},
                            alt: 'cannon ball img'
                        }
        this.ball = $('<img>', this.configObj);
        $('#mainScreen').append(this.ball);
        this.selector = $('#'+this.randomID);
    }
    movement(){
        
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




















// class Tank{
//     constructor( tankOptions ){
//         this.img = tankOptions.img;
//         this.xPosition = tankOptions.xPosition;
//         this.yPosition = tankOptions.yPosition;
//         this.randomID = 'tank' + Math.floor(Math.random() * 1000);
//         this.configObj = {'class': 'tank', 
//                             id: this.randomID,
//                             src: this.img,
//                             css: {'top': this.yPosition+'%', left: this.xPosition+'%'},
//                             alt: 'tank Img'}
//         this.tank = $('<img>', this.configObj);
//         $('#mainScreen').append(this.tank);
//         this.selector = $('#'+this.randomID);
//     }
//     shoot(){
//         console.log('BANG!');
//         shotsFired.push(new CannonBall( {xPosition: this.xPosition, yPosition: this.yPosition} ));
//         console.log(shotsFired[0])
//     }
//     moveLeft(){
//         this.xPosition -= 1.25;
//         this.configObj['css']['left'] = this.xPosition+'%';
//         this.selector.css(this.configObj['css']);
        
//     }
//     moveRight(){
//         this.xPosition += 1.25;
//         this.configObj['css']['left'] = this.xPosition+'%';
//         this.selector.css(this.configObj['css']);
//     }
//     moveUp(){
//         this.yPosition -= 1.25;
//         this.configObj['css']['top'] = this.yPosition+'%';
//         this.selector.css(this.configObj['css']);
//     }
//     moveDown(){
//         this.yPosition += 1.25;
//         this.configObj['css']['top'] = this.yPosition+'%';
//         this.selector.css(this.configObj['css']);
//     }
//     explode(){

//     }
// }