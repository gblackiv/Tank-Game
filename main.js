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
    if( typeof theGameScreen === 'undefined' || typeof theGameScreen.playerTank === 'undefined' || !theGameScreen.playerTank ){
        return;
    }
    theGameScreen.playerTank.shoot()
}
function userKeyDownPresses( event ){
    if( typeof theGameScreen === 'undefined' || typeof theGameScreen.playerTank === 'undefined' || !theGameScreen.playerTank ){
        return;
    }
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
    if( typeof theGameScreen === 'undefined' || typeof theGameScreen.playerTank === 'undefined' || !theGameScreen.playerTank ){
        return;
    }
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
    if( typeof theGameScreen === 'undefined' || typeof theGameScreen.playerTank === 'undefined' || !theGameScreen.playerTank ){
        return;
    }
    let relativeXPosition = event.clientX - $('#mainScreen').offset().left;
    let relativeYPosition = event.clientY - $('#mainScreen').offset().top;
    theGameScreen.playerTank.alignTurret( relativeXPosition, relativeYPosition );
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
