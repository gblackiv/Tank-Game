class GameBoard {
	constructor(){
		this.shotsFiredArray = [];
	}
	addBallToArray( cannonBallObj ){
		this.shotsFiredArray.push( cannonBallObj );
		cannonBallObj.render();
		cannonBallObj.getHitBox();
		cannonBallObj.startHeartbeat();
	}
	removeBallFromArray( cannonBallObj ){
		for( let cannonSearch = 0; cannonSearch < this.shotsFiredArray.length; cannonSearch++ ){
			if( this.shotsFiredArray[ cannonSearch ] === cannonBallObj ){
				this.shotsFiredArray.splice( cannonSearch, 1 );
			}
		}
	}
}