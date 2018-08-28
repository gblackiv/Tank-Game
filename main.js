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