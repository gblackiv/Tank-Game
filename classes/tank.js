class Tank extends ScreenObjects{
    constructor( tankOptions ){
        super(tankOptions);
        this.amITurningRight = false;
        this.amITurningLeft = false;
        this.randomID = 'tank' + Math.floor( Math.random() * 1000 );
        this.rateOfFireBoolean = false;
        this.turretAngle = 0;
        this.configObj = {
            'class': 'tankSquare', 
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
        this.selector = null;
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
        this.collisionDetection( this.currentGameBoard.shotsFiredArray );
    }
    shoot(){
        if( this.rateOfFireBoolean ){
            return;
        }
        this.rateOfFireBoolean = true;
        soundsObj.tankCannon.play();
        var newCannonBall = new CannonBall ( { xPosition: this.xPosition + parseFloat( this.selector.css('transform-origin').split(' ')[ 0 ] ) + ( Math.sin( this.angleOfDirection * radiansConversionFactor ) * ( this.hitBox.width / 1.1 ) ), 
                                        yPosition: this.yPosition + parseFloat( this.selector.css('transform-origin').split(' ')[ 1 ] ) - ( Math.cos( this.angleOfDirection * radiansConversionFactor ) * ( this.hitBox.height / 1.1 ) ), 
                                        img: 'images/cannonBall.png',
                                        angleOfDirection: this.angleOfDirection,
                                        currentGameBoard: this.currentGameBoard } 
                                        ) ;
        setTimeout(() => {
            this.rateOfFireBoolean = false;
        }, rateOfFire );
        this.currentGameBoard.addBallToArray( newCannonBall );
    }
    toggleTurningLeftOn(){
        this.amITurningLeft = true;
    }
    toggleTurningLeftOff(){
        this.amITurningLeft = false;
    }
    turnLeft(){
        this.angleOfDirection -= turnRadius;
        this.turretAngle += turnRadius;
        this.tankTurret.css( 'transform', `rotate(${this.turretAngle}deg)` );
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
        this.angleOfDirection += turnRadius;
        this.turretAngle -= turnRadius;
        this.tankTurret.css( 'transform', `rotate(${this.turretAngle}deg)` );
        this.configObj[ 'css' ][ 'transform' ] = 'rotate(' + this.angleOfDirection + 'deg)';
        this.moveDomElement();
    }
    toggleForwardMovementOn(){
        this.isMoving = true;
    }
    toggleForwardMovementOff(){
        this.isMoving = false;
    }
    collisionDetection( cannonBallArray ){
        for( let collisionIndex = 0; collisionIndex < cannonBallArray.length; collisionIndex++ ){
            if(  this.hitBox.top > cannonBallArray[ collisionIndex ].hitBox.bottom ||
                 this.hitBox.bottom < cannonBallArray[ collisionIndex ].hitBox.top ||
                 this.hitBox.left > cannonBallArray[ collisionIndex ].hitBox.right ||
                this.hitBox.right < cannonBallArray[ collisionIndex ].hitBox.left  ){
                }
                else{
                    this.destroyTank();
                    cannonBallArray[ collisionIndex ].destroyCannonBall();
                    soundsObj.tankDeath.play();

                }
        }
    }
    moveReverse(){

    }
    destroyTank(){
        this.stopHeartbeat();
        this.selector.remove();
        this.currentGameBoard.removeTankFromGame( this );
    }
    render(){
        this.tankGun = $( '<div>', { 'class': 'tankGun' } );
        this.tankTurret = $( '<div>', { 'class': 'tankTurret' } );
        this.tank = $( '<div>', this.configObj );
        this.tankTurret.append( this.tankGun );
        this.tank.append( this.tankTurret );
        $( '#mainScreen' ).append( this.tank );
        this.selector = $( '#'+this.randomID );
    }
    alignTurret(x, y){
        let deltaX = -(this.xPosition - x);
        let deltaY = -(this.yPosition - y);
        let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor ) + 90;
        this.turretAngle = theta - this.angleOfDirection;
        this.tankTurret.css( 'transform', `rotate(${this.turretAngle}deg)` );
    }
}

