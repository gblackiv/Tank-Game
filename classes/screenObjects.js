class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
    }
    moveForward( selector ){
        var newXPosition = Math.sin( this.angleOfDirection * radiansConversionFactor ) * 10;
        var newYPosition = Math.cos( this.angleOfDirection * radiansConversionFactor ) * 10;
        this.xPosition += newXPosition;
        this.yPosition -= newYPosition;
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + '%';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + '%';
        selector.css( this.configObj[ 'css' ] );
    }
}