class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
        this.isMoving = false;
        this.heartbeatTimer = 30;
        this.heartbeat = null;
        this.forwardSpeed = 75;
        this.movementsPerSecond = 1000 / this.heartbeatTimer;
        this.forwardSpeedPerSecond = this.forwardSpeed / this.movementsPerSecond;  //doesnt need to be hard coded
    }
    startHeartbeat(){
        if( this.heartbeat !== null){
            this.stopHeartbeat;
        }
        this.heartbeat = setInterval( this.handleHeartbeat.bind( this ), this.heartbeatTimer );
    }
    stopHeartbeat(){
        this.heartbeat = null;
    }
    moveForward(){

        var newXPosition = Math.sin( this.angleOfDirection * radiansConversionFactor ) * this.forwardSpeedPerSecond;
        var newYPosition = Math.cos( this.angleOfDirection * radiansConversionFactor ) * this.forwardSpeedPerSecond;
        this.xPosition += newXPosition;
        this.yPosition -= newYPosition;
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + 'px';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + 'px';
        this.moveDomElement();
        //selector.css( this.configObj[ 'css' ] );
    }
    moveDomElement(){
        this.selector.css( this.configObj[ 'css' ] );
    }
}
