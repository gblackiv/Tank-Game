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
		tankConfigObj.gameBoardArrayPosition = this.otherTanks.length	//adds into the constructor the position in the array that the other tank will be assigned to
		var newTank = new TankBot( tankConfigObj );
		newTank.render();
		newTank.getHitBox();
		this.otherTanks.push( newTank );
	}
	removeTankFromGame( tankObj ){
		if( tankObj === this.playerTank ){
			this.playerTank = null;
		}
		else{
			this.otherTanks.splice( tankObj.gameBoardArrayPosition, 1 );
			for( let tankSearch = tankObj.gameBoardArrayPosition; tankSearch < this.otherTanks.length; tankSearch++ ){
				this.otherTanks[ tankSearch ].gameBoardArrayPosition--;
			}
		}
		console.log(this.otherTanks)
		if( !this.playerTank ){
			this.playerDiedModal();
		}
		if( !this.otherTanks[0] ){
			this.allBotsDestroyed();
		}
	}
	playerDiedModal(){
		console.warn('player died');
	}
	allBotsDestroyed(){
		console.warn('bots dead');
	}
}