class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
    }
    moveForward(selector){
        this.xPosition = Math.cos( this.angleOfDirection ) * 10;
        this.yPosition = Math.sin( this.angleOfDirection ) * 10;
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + '%';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + '%';
        selector.css( this.configObj[ 'css' ] );
    }
}