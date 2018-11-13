class GameBoard {
	constructor(){
		this.shotsFiredArray = [];
		this.playerTank = null;
		this.otherTanks = [];
		this.radarSelector  = null;
		this.modal = $( '.modalContainer' );
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
		this.startInvulnerability( newTank );
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
		if( !this.playerTank ){
			this.playerDiedModal();
			this.otherTanks.forEach( tank => {
				tank.stopHeartbeat();
			})
		}
		if( this.otherTanks.length < 1 ){
			this.allBotsDestroyed();
		}
	}
	playerDiedModal(){
		if( this.checkForCatsGame() ){
			return;
		}
		this.modal.removeClass( 'hidden' );
		$( '.modalButton' ).off( 'click' );
		const newPlayerConfigObj = {
			xPosition: randomNumberGenerator( window.innerWidth ),
			yPosition: randomNumberGenerator( window.innerHeight ),
			angleOfDirection: 0,
			currentGameBoard: this
		};
		$( '.modalHeader p' ).text( 'You lost...' );
		$( '.modalBody' ).text( "The tank bots destroyed you!" );
		$( '#modalButton1' ).addClass( 'hidden' );
		$( '#modalButton3' ).addClass( 'hidden' );
		$( '#modalButton2' ).click( () => {
			this.radarSelector.destroy();
			delete this.radarSelector;
			this.createNewPlayerTank( newPlayerConfigObj );
			this.createRadar( {
				currentGameBoard: this
			} );
			this.modal.addClass( 'hidden' );
			this.otherTanks.forEach( ( tank )=> {
				this.startInvulnerability( tank );
			});
		} );
		$( '#modalButton2' ).text( 'Respawn' );
	}
	allBotsDestroyed(){
		if( this.checkForCatsGame() ){
			return;
		}
		this.modal.removeClass( 'hidden' );
		$( '.modalButton' ).off( 'click' );
		$( '.modalHeader p' ).text( 'You Won!' );
		$( '.modalBody' ).text( "You've destroyed the enemy tanks! Choose how many new tanks you want to spawn." );
		$( '#modalButton1' ).removeClass( 'hidden' );
		$( '#modalButton3' ).removeClass( 'hidden' );
		$( '#modalButton2' ).text( 'Two' ).click( () => {
			this.createMultipleTanks( 2 );
		} );
		$( '#modalButton3' ).click( () => {
			this.createMultipleTanks( 3 );
		} );
		$( '#modalButton1' ).click( () => {
			this.createMultipleTanks( 1 );
		} );
	}
	createMultipleTanks( howManyTanks ){
		for( let tankNumber = 0; tankNumber < howManyTanks; tankNumber++ ){
			const tankConfigObj = {
				xPosition: randomNumberGenerator( window.innerWidth ),
				yPosition: randomNumberGenerator( window.innerHeight ),
				angleOfDirection: 0,
				currentGameBoard: this
			};
			this.createNewTank( tankConfigObj );
		}
		this.modal.addClass( 'hidden' );
	}
	checkForCatsGame(){
		if( this.otherTanks.length < 1 && !this.playerTank ){
			this.modal.removeClass( 'hidden' );
			$( '.modalButton' ).off( 'click' );
			const newPlayerConfigObj = {
				xPosition: randomNumberGenerator( window.innerWidth ),
				yPosition: randomNumberGenerator( window.innerHeight ),
				angleOfDirection: 0,
				currentGameBoard: this
			};
			const newBotConfigObj = {
				xPosition: randomNumberGenerator( window.innerWidth ),
				yPosition: randomNumberGenerator( window.innerHeight ),
				angleOfDirection: 0,
				currentGameBoard: this
			};
			$( '.modalHeader p' ).text( 'Draw!' );
			$( '.modalBody' ).text( "You destroyed the bots, but also were destroyed!" );
			$( '#modalButton1' ).addClass( 'hidden' );
			$( '#modalButton3' ).addClass( 'hidden' );
			$( '#modalButton2' ).click( () => {
				this.radarSelector.destroy();
				delete this.radarSelector;
				this.createNewPlayerTank( newPlayerConfigObj );
				this.createRadar( {
					currentGameBoard: this
				} );
				this.createNewTank( newBotConfigObj );
				this.modal.addClass( 'hidden' );
			} );
			$( '#modalButton2' ).text( 'Restart' );
			return true;
		}
	}
	startInvulnerability( tankObj ){
		tankObj.selector.addClass('invulnerableClass');
		setTimeout(() => {
			tankObj.selector.removeClass('invulnerableClass');
			tankObj.getHitBox();
			tankObj.startHeartbeat( true );
		}, invulnerableTimer)
	}
}