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
		this.moveForward();
		this.shoot();
	}
	scan(){
		if( !this.currentGameBoard.playerTank ){
			return;
		}
		try{
			let deltaX = -(this.hitBox.x - this.currentGameBoard.playerTank.hitBox.x);
			let deltaY = -(this.hitBox.y - this.currentGameBoard.playerTank.hitBox.y);
			let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor );
			let pythagoreanDistance = Math.sqrt( Math.pow( deltaX, 2 ) + Math.pow( deltaY, 2 ) );
			if( tankBotCircleRange + 50 > pythagoreanDistance && pythagoreanDistance > tankBotCircleRange ){
				this.changeFacing( theta + 180 );
			}
			else if( pythagoreanDistance < tankBotCircleRange ){
				this.changeFacing( theta );
			}
			else{
				this.changeFacing( theta + 90 );
			}
			this.pointTurret( theta + 90 );
		}
		catch{
			return;
		}
	}
	changeFacing( theta ){
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
	pointTurret( theta ){
		this.turretAngle = theta - this.angleOfDirection;
		this.tankTurret.css( 'transform', `rotate(${this.turretAngle}deg)` );
	}

}