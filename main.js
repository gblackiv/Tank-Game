$(document).ready(initializeGame)
var playerTank;
var dummyTank;
var theGameScreen;
var shotsFired = [];

function initializeGame(){
    theGameScreen = new GameBoard();
    theGameScreen.createNewPlayerTank( { img: 'images/tankPic.png', xPosition: 0, yPosition: 25, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 300, yPosition: 400, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 500, yPosition: 100, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 100, yPosition: 200, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    theGameScreen.createNewTank( { img: 'images/tankPic.png', xPosition: 200, yPosition: 400, angleOfDirection: 0, currentGameBoard: theGameScreen } );
    attachEventHandlers();
}

function attachEventHandlers(){
    $( document ).keydown( userKeyDownPresses );
    $( document ).keyup( userKeyUpPresses );
}
function userKeyDownPresses( event ){
    switch( event.which ){
        case 37:
            theGameScreen.playerTank.toggleTurningLeftOn();
            break;
        case 38: 
            theGameScreen.playerTank.toggleForwardMovementOn();
            break;
        case 39:
            theGameScreen.playerTank.toggleTurningRightOn();
            break;
        case 32: 
            theGameScreen.playerTank.shoot();
            break;
    }
}
function userKeyUpPresses( event ){
    switch( event.which ){
        case 37:
            theGameScreen.playerTank.toggleTurningLeftOff();
            break;
        case 38:
            theGameScreen.playerTank.toggleForwardMovementOff();
            break;
        case 39:
            theGameScreen.playerTank.toggleTurningRightOff();
            break;
    }
}

