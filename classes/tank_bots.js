class TankBots extends Tank{
	constructor(){

	}
	startPassiveHeartBeat(){
		if( this.heartbeat !== null){
			this.stopHeartbeat();
		}
		this.heartbeat = setInterval( this.handleHeartbeat.bind( this ), this.heartbeatTimer * 5 );

	}
	passiveHeartBeat(){

	}
	activeHeartBeat(){
		
	}
}