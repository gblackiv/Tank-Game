class ScreenObjects{
    constructor( screenObjectOptions ){
        this.currentGameBoard = screenObjectOptions.currentGameBoard;
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
        this.isMoving = false;
        this.isReversing = false;
        this.hitBox = null;
        this.heartbeatTimer = globalHeartbeatTimer;
        this.heartbeat = null;
        this.forwardSpeed = tankSpeed;
        this.reverseSpeed = tankSpeed / 1.5;
        this.movementsPerSecond = 1000 / this.heartbeatTimer;
        this.forwardSpeedPerSecond = this.forwardSpeed / this.movementsPerSecond;
        this.reverseSpeedPerSecond = this.reverseSpeed / this.movementsPerSecond;
    }
    startHeartbeat( bot = false ){
        if( this.heartbeat !== null){
            this.stopHeartbeat();
        }
        if( bot ){
            this.heartbeat = setInterval( this.handleAIHeartbeat.bind( this ), this.heartbeatTimer );
        }
        else{
            this.heartbeat = setInterval( this.handleHeartbeat.bind( this ), this.heartbeatTimer );
        }
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
    moveReverse(){
        var newXPosition = Math.sin( this.angleOfDirection * radiansConversionFactor ) * this.reverseSpeedPerSecond;
        var newYPosition = Math.cos( this.angleOfDirection * radiansConversionFactor ) * this.reverseSpeedPerSecond;
        this.xPosition += -newXPosition;
        this.yPosition -= -newYPosition;
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + 'px';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + 'px';
        this.moveDomElement();
    }
    moveDomElement(){
        this.selector.css( this.configObj[ 'css' ] );
    }
    getHitBox(){
        this.hitBox = document.getElementById(this.randomID).getBoundingClientRect().toJSON();
        if( this.xPosition < 0 ){
            this.xPosition = 0;
        }
        if( this.yPosition < 0 ){
            this.yPosition = 0;
        }
        if( this.xPosition + ( this.hitBox.width / 2 ) > window.innerWidth ){
            this.xPosition = window.innerWidth - ( this.hitBox.width / 2 );
        }
        if( this.yPosition + ( this.hitBox.height / 2 ) > window.innerHeight ){
            this.yPosition = window.innerHeight - ( this.hitBox.height / 2 );
        }
    }
}
