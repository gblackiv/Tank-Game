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
        //FIXME find the rotation of the turret using trig based off mouse and tank position
        let deltaX = this.xPosition - x;
        let deltaY = this.yPosition - y;


        //deltaX = Math.abs( deltaX );
        //deltaY = Math.abs( deltaY );
        // console.log('deltaX:', deltaX);
        // console.log('deltaY: ', deltaY);
        let theta = Math.atan2( deltaY, deltaX ) * degreeConversionFactor;
        console.log('theta:', theta)
        if( deltaX < 0 && deltaY < 0 ){
            theta += 90;
        }
        else if( deltaX > 0 && deltaY < 0 ){
            theta += 180;
        }
        else if( deltaX > 0 && deltaY > 0 ){
            theta += 270;
        }
        this.turretAngle = theta - this.angleOfDirection;
        //deltaX and deltaY are the differneces of x and y coordinates from tank to mouse.
        //theta is the angle of the deltas to the mouse. must use if statements to correct angle so that it corilates with the correct quadrant of the screen
        //math is on meistertask
        // var newXPosition = Math.sin( this.angleOfDirection * radiansConversionFactor ) * this.forwardSpeedPerSecond;
        // var newYPosition = Math.cos( this.angleOfDirection * radiansConversionFactor ) * this.forwardSpeedPerSecond;
        this.tankTurret.css( 'transform', `rotate(${theta}deg)` );
    }
}

