class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
        this.isMoving = false;
    }
    moveForward( selector ){
        if( this.isMoving ){
            return;
        }
        this.isMoving = true;
        var newXPosition = Math.sin( this.angleOfDirection * radiansConversionFactor ) * 5;
        var newYPosition = Math.cos( this.angleOfDirection * radiansConversionFactor ) * 5;
        this.xPosition += newXPosition;
        this.yPosition -= newYPosition;
        selector.animate( { left: `+=${newXPosition}%` }, 'fast' );
        selector.animate( { top: `-=${newYPosition}%` }, 'fast', ()=>{ this.isMoving = false; } );
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + '%';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + '%';

        //selector.css( this.configObj[ 'css' ] );
    }
}