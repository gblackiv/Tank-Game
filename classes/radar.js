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
			let theta = ( Math.atan2( deltaY, deltaX ) * degreeConversionFactor );
			if( theta < 0 ){
				theta += 360;
			}
			if( (this.currentAngle + .5) > theta && theta > this.currentAngle ){
				if( ( deltaX + deltaY ) / 2 < radarRange ){
					const blip = new Blip( {
						radar: this.container,
						left: ( deltaX / 20 ),
						top: ( deltaY / 20 )
						} ) ;
					blip.render();
				}
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
