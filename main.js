$(document).ready(initializeGame)
var playerTank
var shotsFired = [];

function initializeGame(){
    playerTank = new Tank( { img: 'images/tankPic.jpeg', xPosition: 0, yPosition: 25, angleOfDirection: 0 } );
    playerTank.startHeartbeat();
    attachEventHandlers();
}

function attachEventHandlers(){
    $( document ).keydown( userKeyDownPresses );
    $( document ).keyup( userKeyUpPresses );
}
function userKeyDownPresses( event ){
    switch( event.which ){
        case 37:
            playerTank.toggleTurningLeftOn();
            break;
        case 38: 
            playerTank.toggleForwardMovementOn();
            break;
        case 39:
            playerTank.toggleTurningRightOn();
            break;
        case 40:
            playerTank.moveDown();
            break;
        case 32: 
            playerTank.shoot();
            break;
    }
}
function userKeyUpPresses( event ){
    switch( event.which ){
        case 37:
            playerTank.toggleTurningLeftOff();
            break;
        case 38:
            playerTank.toggleForwardMovementOff();
            break;
        case 39:
            playerTank.toggleTurningRightOff();
            break;
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