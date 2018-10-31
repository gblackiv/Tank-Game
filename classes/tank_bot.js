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
		this.facePlayerTank( theta );
	}
	facePlayerTank( theta ){
		console.log(this.angleOfDirection)
		if( this.angleOfDirection + 5 > theta ){
			this.toggleTurningLeftOn();
		}
		else{
			this.toggleTurningLeftOff();
		}
		if( this.angleOfDirection - 5 < theta ){
			this.toggleTurningRightOn();
		}
		else{
			this.toggleTurningRightOff();
		}
	}

}