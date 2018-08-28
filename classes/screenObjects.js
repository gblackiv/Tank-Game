class ScreenObjects{
    constructor( screenObjectOptions ){
        this.img = screenObjectOptions.img;
        this.xPosition = screenObjectOptions.xPosition;
        this.yPosition = screenObjectOptions.yPosition;
        this.angleOfDirection = screenObjectOptions.angleOfDirection;
    }
    moveForward( selector ){
        var newXPosition = Math.sin( this.angleOfDirection ) * 10;
        var newYPosition = Math.cos( this.angleOfDirection ) * 10;
        console.log('newXPosition',newXPosition)
        console.log('newYPosition',newYPosition)

        if( this.angleOfDirection <= 90 ){
            console.log('current x pos:', this.xPosition);
            this.xPosition += newXPosition;
            this.yPosition -= newYPosition;
            console.log('new x pos:', this.xPosition);
        }
        else if( this.angleOfDirection <= 180 ){
            console.log('current x pos:', this.xPosition);

            this.xPosition += newXPosition;
            this.yPosition += newYPosition;
            console.log('new x pos:', this.xPosition);

        }
        else if( this.angleOfDirection <= 270 ){
            console.log('current x pos:', this.xPosition);

            this.xPosition -= newXPosition;
            this.yPosition += newYPosition;
            console.log('new x pos:', this.xPosition);

        }
        else{
            console.log('current x pos:', this.xPosition);
            this.xPosition -= newXPosition;
            this.yPosition -= newYPosition;
            console.log('new x pos:', this.xPosition);

        }
        this.configObj[ 'css' ][ 'left' ] = this.xPosition + '%';
        this.configObj[ 'css' ][ 'top' ] = this.yPosition + '%';
        selector.css( this.configObj[ 'css' ] );
    }
}