class ScreenObjects{
    constructor( screenObjectOptions ){
        this.currentGameBoard = screenObjectOptions.currentGameBoard;
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
        this.isMoving = false;
        this.hitBox = null;
        this.heartbeatTimer = this.currentGameBoard.heartbeatTimer;
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
        clearInterval(this.heartbeat);
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
    }
    moveDomElement(){
        this.selector.css( this.configObj[ 'css' ] );
    }
    getHitBox(){
        this.hitBox = document.getElementById(this.randomID).getBoundingClientRect().toJSON();
    }
}
