class Radar{
	constructor( radarConfigObj ){
		this.currentGameBoard = radarConfigObj.currentGameBoard;
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
	}
	spin(){
		this.currentAngle += radarSpeed;
		if( this.currentAngle === 360 ){
			this.currentAngle = 0;
		}
		this.sweeper.css('transform', `rotate(${this.currentAngle}deg)`);
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
