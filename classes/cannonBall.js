class CannonBall extends ScreenObjects{
    constructor( cannonBallOptions ){
        super( cannonBallOptions );
        this.isMoving = true;
        this.forwardSpeed = 300;
        this.forwardSpeedPerSecond = this.forwardSpeed / this.movementsPerSecond;  //doesnt need to be hard coded
        this.randomID = 'cannonball' + Math.floor( Math.random() * 1000 );
        this.configObj = {
            'class': 'cannonBall',
            id: this.randomID,
            css: { 'left': this.xPosition + 'px',
                    'top': this.yPosition +'px' },
        }
        this.selector = null;
    }
    handleHeartbeat(){
        if( this.isMoving ){
            this.moveForward();
        }
        this.getHitBox();
        this.checkIfStillOnScreen();
    }
    destroyCannonBall(){
        this.selector.remove();
        this.stopHeartbeat();
        this.currentGameBoard.removeBallFromArray( this );
    }
    checkIfStillOnScreen(){
        if( parseInt( this.selector.css( 'left' ) ) < 0 || parseInt( this.selector.css( 'left' ) ) >  $( '#mainScreen' ).width() ){
            this.destroyCannonBall();
        }
        if( parseInt( this.selector.css( 'top' ) ) < 0 || parseInt( this.selector.css( 'top' ) ) > $( '#mainScreen' ).height() ){
            this.destroyCannonBall();
        }
    }
    render(){
        this.ball = $( '<div>', this.configObj );
        $( '#mainScreen' ).append(this.ball );
        this.selector = $( '#'+this.randomID );
    }
}
