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
	destroy(){
		this.stopHeartbeat();
		this.container.remove();
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
		try{
			this.currentGameBoard.otherTanks.forEach( otherTank => {
				let deltaX = -(this.playerTank.hitBox.x - otherTank.hitBox.x);
				let deltaY = -(this.playerTank.hitBox.y - otherTank.hitBox.y);
				let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor );
				if( theta < 0 ){
					theta += 360;
				}
				if( (this.currentAngle + .5) > theta && theta > this.currentAngle ){
					if( ( Math.abs( deltaX ) + Math.abs( deltaY ) ) / 2 < radarRange ){
						const blip = new Blip( {
							radar: this.container,
							left: ( deltaX / radarBlipRatio ),
							top: ( deltaY / radarBlipRatio )
							} ) ;
						blip.render();
						if( !otherTank.heartbeat ){
							otherTank.startHeartbeat( true );
						}
					}
				}
			});
		}
		catch{
			return;
		}
	}
	render(){
		this.container = $( '<section>', {
			id: 'radarContainer'
		});
		this.sweeper = $( '<div>', {
			id: 'sweeper'
		});
		this.container.append( this.sweeper );
		$( '#mainScreen' ).prepend( this.container );
	}
}
