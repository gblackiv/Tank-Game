class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
        this.isMoving = false;
        this.heartbeatTimer = 30;
        this.heartbeat = null;
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
    moveForward( selector ){
        var newXPosition = Math.sin( this.angleOfDirection * radiansConversionFactor ) * 5;
        var newYPosition = Math.cos( this.angleOfDirection * radiansConversionFactor ) * 5;
        this.xPosition += newXPosition;
        this.yPosition -= newYPosition;
        selector.animate( { left: `+=${newXPosition}%` }, { duration: 500, 
                                                            easing: 'linear', 
                                                            queue: false} );

        selector.animate( { top: `-=${newYPosition}%` }, { duration: 500, 
                                                            easing: 'linear', 
                                                            queue: false,
                                                            complete: ()=>{ this.isMoving = false; } });
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + '%';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + '%';

        //selector.css( this.configObj[ 'css' ] );
    }
}

//you can use that counter in many places as a reference
//encapsulation of the counter so it cannot be changed unless the function is ran
