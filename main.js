$(document).ready(initializeGame)
var theGameScreen;

function initializeGame(){
    attachEventHandlers();
}

function attachEventHandlers(){
    $( document ).keydown( userKeyDownPresses );
    $( document ).keyup( userKeyUpPresses );
    $( '#mainScreen' ).mousemove( mouseMoving );
    $( '#startGameButton').click( changeScreens );
    $( '.modalClose' ).click( modalClose );
    $( '#mainScreen' ).mousedown( shootWithMouse );


}
function modalClose( event ){
    $( '.modalContainer' ).addClass( 'hidden' );
    event.stopPropagation()
}
function shootWithMouse( event ){
    try{
        theGameScreen.playerTank.shoot()
    }
    catch{
        return;
    }
}
function userKeyDownPresses( event ){
    try{
        switch( event.which ){
            case 65:
                theGameScreen.playerTank.toggleTurningLeftOn();
                break;
            case 87: 
                theGameScreen.playerTank.toggleForwardMovementOn();
                break;
            case 83:
                theGameScreen.playerTank.toggleReverseMovementOn();
                break;
            case 68:
                theGameScreen.playerTank.toggleTurningRightOn();
                break;
            case 32: 
                theGameScreen.playerTank.shoot();
                break;
        }
    }
    catch{
        return;
    }
}
function userKeyUpPresses( event ){
    try{
        switch( event.which ){
            case 65:
                theGameScreen.playerTank.toggleTurningLeftOff();
                break;
            case 87:
                theGameScreen.playerTank.toggleForwardMovementOff();
                break;
            case 83:
                theGameScreen.playerTank.toggleReverseMovementOff();
                break;
            case 68:
                theGameScreen.playerTank.toggleTurningRightOff();
                break;
        }
    }
    catch{
        return;
    }
}
function mouseMoving( event ){
    try{
        let relativeXPosition = event.clientX - $('#mainScreen').offset().left;
        let relativeYPosition = event.clientY - $('#mainScreen').offset().top;
        theGameScreen.playerTank.alignTurret( relativeXPosition, relativeYPosition );
    }
    catch{
        return;
    }
}
function changeScreens( event ){
    event.stopPropagation()
    $( '#startScreen' ).addClass( 'hidden' );
    $( '#mainScreen' ).removeClass( 'hidden' );
    startGame();
}
function startGame(){
    theGameScreen = new GameBoard();
    theGameScreen.createNewPlayerTank( { 
        xPosition: randomNumberGenerator(window.innerWidth),
        yPosition: randomNumberGenerator(window.innerHeight), 
        angleOfDirection: 0, currentGameBoard: theGameScreen 
    } );
    theGameScreen.createNewTank( { 
        xPosition: randomNumberGenerator(window.innerWidth), 
        yPosition: randomNumberGenerator(window.innerHeight), 
        angleOfDirection: 0, currentGameBoard: theGameScreen 
    } );
    theGameScreen.createRadar( { 
        currentGameBoard: theGameScreen 
    } );

}
