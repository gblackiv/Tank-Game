class TankBot extends Tank{
	constructor( tankConfigObj ){
		super( tankConfigObj );
	}
	handleAIHeartbeat(){
		this.scan();
		this.getHitBox();
		this.collisionDetection( this.currentGameBoard.shotsFiredArray );
		if( this.amITurningLeft ){
            this.turnLeft();
        }
        if( this.amITurningRight ){
            this.turnRight();
        }
		this.shoot();
	}
	scan(){
		let deltaX = -(this.hitBox.x - this.currentGameBoard.playerTank.hitBox.x);
		let deltaY = -(this.hitBox.y - this.currentGameBoard.playerTank.hitBox.y);
		let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor ) + 90;
		console.log(theta)
		if( this.angleOfDirection > theta ){
			this.toggleTurningLeftOn();
		}
		else{
			this.toggleTurningLeftOff();
		}
		if( this.angleOfDirection < theta ){
			this.toggleTurningRightOn();
		}
		else{
			this.toggleTurningRightOff();
		}
	}
}