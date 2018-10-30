class TankBot extends Tank{
	constructor( tankConfigObj ){
		super( tankConfigObj );
	}
	handleAIHeartbeat(){
		this.getHitBox();
		this.collisionDetection( this.currentGameBoard.shotsFiredArray );
		this.shoot();
	}
}