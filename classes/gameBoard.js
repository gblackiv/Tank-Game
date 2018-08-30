class GameBoard {
	constructor(){
		this.shotsFiredArray = [];
		this.heartbeat = null;
		this.heartbeatTimer = 30;
	}
	addBallToArray( cannonBallObj ){
		this.shotsFiredArray.push( cannonBallObj );
		cannonBallObj.render();
		cannonBallObj.startHeartbeat();
		console.log(this.shotsFiredArray)
	}
	removeBallFromArray( cannonBallObj ){
		for( let cannonSearch = 0; cannonSearch < this.shotsFiredArray.length; cannonSearch++ ){
			if( this.shotsFiredArray[ cannonSearch ] === cannonBallObj ){
				this.shotsFiredArray.splice( cannonSearch, 1 );
			}
		}
	}
	startHeartbeat(){
        if( this.heartbeat !== null){
            this.stopHeartbeat;
        }
        this.heartbeat = setInterval( this.handleHeartbeat.bind( this ), this.heartbeatTimer );
    }
    stopHeartbeat(){
        clearInterval(this.heartbeat);
        this.heartbeat = null;
    }

}