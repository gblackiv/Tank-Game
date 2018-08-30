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

