class TankBot extends Tank{
	constructor( tankConfigObj ){
		super( tankConfigObj );
	}
	handleAIHeartbeat(){
		console.log('ai heartbeat')
		this.getHitBox();
		this.collisionDetection( this.currentGameBoard.shotsFiredArray );
		this.shoot();
	}
}