class Tank extends ScreenObjects{
    constructor( tankOptions ){
        super(tankOptions);
        this.amITurningRight = false;
        this.amITurningLeft = false;
        this.randomID = 'tank' + Math.floor( Math.random() * 1000 );
        this.rateOfFireBoolean = false;
        this.configObj = {
            'class': 'tank', 
            id: this.randomID,
            src: this.img,
            css: { 
                'top': this.yPosition+'px', 
                left: this.xPosition+'px', 
                transition: `transform ${this.heartbeatTimer} linear, 
                left ${this.heartbeatTimer} linear, 
                right ${this.heartbeatTimer} linear` },
            alt: 'tank Img',
        }
        this.tank = $( '<img>', this.configObj);
        $( '#mainScreen' ).append( this.tank );
        this.selector = $( '#'+this.randomID );
    }
    handleHeartbeat(){
        if( this.amITurningLeft ){
            this.turnLeft();
        }
        if( this.amITurningRight ){
            this.turnRight();
        }
        if( this.isMoving ){
            this.moveForward( this.selector );
        }
        this.getHitBox();
    }
    shoot(){
        if( this.rateOfFireBoolean ){
            return;
        }
        this.rateOfFireBoolean = true;
        var newCannonBall = new CannonBall ( { xPosition: this.xPosition + parseFloat( this.selector.css('transform-origin').split(' ')[ 0 ] ), 
                                        yPosition: this.yPosition + parseFloat( this.selector.css('transform-origin').split(' ')[ 1 ] ), 
                                        img: 'images/cannonBall.png',
                                        angleOfDirection: this.angleOfDirection,
                                        currentGameBoard: this.currentGameBoard } 
                                        ) ;
        setTimeout(() => {
            this.rateOfFireBoolean = false;
        }, 200 );
        this.currentGameBoard.addBallToArray( newCannonBall );
    }
    toggleTurningLeftOn(){
        this.amITurningLeft = true;
    }
    toggleTurningLeftOff(){
        this.amITurningLeft = false;
    }
    turnLeft(){
        this.angleOfDirection -= 5;
        this.configObj[ 'css' ][ 'transform' ] = 'rotate('+this.angleOfDirection+'deg)';
        this.moveDomElement()
    }
    toggleTurningRightOn(){
        this.amITurningRight = true;
    }
    toggleTurningRightOff(){
        this.amITurningRight = false;
    }
    turnRight(){
        this.angleOfDirection += 5;
        this.configObj[ 'css' ][ 'transform' ] = 'rotate(' + this.angleOfDirection + 'deg)';
        this.moveDomElement()
    }
    toggleForwardMovementOn(){
        this.isMoving = true;
    }
    toggleForwardMovementOff(){
        this.isMoving = false;
    }
    collisionDetection(){

    }
    moveReverse(){

    }


}
//getBoundingClientRect