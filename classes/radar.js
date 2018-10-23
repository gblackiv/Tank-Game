class Radar{
	constructor( radarConfigObj ){
		this.currentGameBoard = radarConfigObj.currentGameBoard;
		this.playerTank = this.currentGameBoard.playerTank;
		this.currentAngle = 0;
		this.sweeper = null;
		this.container = null;
	}
    startHeartbeat(){
        if( this.heartbeat !== null){
            this.stopHeartbeat();
        }
        this.heartbeat = setInterval( this.handleHeartbeat.bind( this ), this.heartbeatTimer );
    }
    stopHeartbeat(){
        clearInterval(this.heartbeat);
        this.heartbeat = null;
	}
	handleHeartbeat(){
		this.spin();
		this.scan();
	}
	spin(){
		this.currentAngle += radarSpeed;
		if( this.currentAngle === 360 ){
			this.currentAngle = 0;
		}
		this.sweeper.css('transform', `rotate(${this.currentAngle}deg)`);
	}
	scan(){
		this.currentGameBoard.otherTanks.forEach( otherTank => {
			let deltaX = -(this.playerTank.hitBox.x - otherTank.hitBox.x);
			let deltaY = -(this.playerTank.hitBox.y - otherTank.hitBox.y);
			// console.log('deltax:',deltaX);
			// console.log('deltay:', deltaY);
			let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor );
			if( theta < 0 ){
				theta += 360;
			}
			console.log('theta:',theta);
			if( (this.currentAngle + 5) > theta && theta > this.currentAngle ){
				debugger;
				console.log('target locked!');
			}

		});
	}
	render(){
		this.container = $( '<section>', {
			id: 'radarContainer'
		});
		this.sweeper = $( '<div>', {
			id: 'sweeper'
		});
		this.container.append( this.sweeper );
		$( 'body' ).prepend( this.container );
	}
}

/**alignTurret(x, y){
        let deltaX = -(this.xPosition - x);
        let deltaY = -(this.yPosition - y);
        let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor ) + 90;
        this.turretAngle = theta - this.angleOfDirection;
        this.tankTurret.css( 'transform', `rotate(${this.turretAngle}deg)` );
    } */
