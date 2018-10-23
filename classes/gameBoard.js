class GameBoard {
	constructor(){
		this.shotsFiredArray = [];
		this.playerTank = null;
		this.otherTanks = [];
		this.radarSelector  = null;
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
	createNewPlayerTank( tankConfigObj ){
		var newTank = new Tank( tankConfigObj );
		newTank.render();
		newTank.startHeartbeat();
		this.playerTank = newTank;
	}
	createNewTank( tankConfigObj ){
		var newTank = new Tank( tankConfigObj );
		newTank.render();
		newTank.startHeartbeat();
		this.otherTanks.push( newTank );
	}
	removeTankFromGame( tankObj ){
		if( tankObj === playerTank ){
			playerTank = null;
		}
		else{
			for( let tankSearch = 0; tankSearch < this.otherTanks.length; tankSearch++ ){
				if( tankObj === this.otherTanks[ tankSearch ] ){
					this.otherTanks.splice( tankSearch, 1 );
				}
			}
		}
	}
	renderRadar(){
		const radarConfigObj = {
			css: {}
		}
		const newRadar = $('<div>',)
	}
}