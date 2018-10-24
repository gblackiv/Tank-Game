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
	createRadar( radarConfigObj ){
		const newRadar = new Radar( radarConfigObj );
		newRadar.render();
		this.radarSelector = newRadar;
		newRadar.startHeartbeat();
	}
	createNewPlayerTank( tankConfigObj ){
		tankConfigObj.class = 'playerTank tankSquare';
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
		if( tankObj === this.playerTank ){
			this.playerTank = null;
		}
		else{
			for( let tankSearch = 0; tankSearch < this.otherTanks.length; tankSearch++ ){
				if( tankObj === this.otherTanks[ tankSearch ] ){
					this.otherTanks.splice( tankSearch, 1 );
				}
			}
		}
	}
}