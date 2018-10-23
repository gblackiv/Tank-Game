$(document).ready(initializeGame)
var playerTank;
var dummyTank;
var theGameScreen;
var shotsFired = [];

function initializeGame(){
    theGameScreen = new GameBoard();
    theGameScreen.createNewPlayerTank( { img: 'images/tankPic.png', xPosition: 50, yPosition: 55, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 300, yPosition: 400, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 500, yPosition: 100, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 200, yPosition: 400, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    attachEventHandlers();
}

function attachEventHandlers(){
    $( document ).keydown( userKeyDownPresses );
    $( document ).keyup( userKeyUpPresses );
    $( '#mainScreen' ).mousemove( mouseMoving );
}
function userKeyDownPresses( event ){
    switch( event.which ){
        case 65:
            theGameScreen.playerTank.toggleTurningLeftOn();
            break;
        case 87: 
            theGameScreen.playerTank.toggleForwardMovementOn();
            break;
        case 68:
            theGameScreen.playerTank.toggleTurningRightOn();
            break;
        case 32: 
            theGameScreen.playerTank.shoot();
            break;
    }
}
function userKeyUpPresses( event ){
    switch( event.which ){
        case 65:
            theGameScreen.playerTank.toggleTurningLeftOff();
            break;
        case 87:
            theGameScreen.playerTank.toggleForwardMovementOff();
            break;
        case 68:
            theGameScreen.playerTank.toggleTurningRightOff();
            break;
    }
}
function mouseMoving( event ){
    let relativeXPosition = event.clientX - $('#mainScreen').offset().left;
    let relativeYPosition = event.clientY - $('#mainScreen').offset().top;
    theGameScreen.playerTank.alignTurret( relativeXPosition, relativeYPosition );
}

