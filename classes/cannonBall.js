class CannonBall extends ScreenObjects{
    constructor( cannonBallOptions ){
        super( cannonBallOptions );
        this.randomID = 'cannonball' + Math.floor( Math.random() * 1000 );
        this.configObj = {
            'class': 'cannonBall',
            id: this.randomID,
            src: this.img,
            css: { 'left': this.xPosition + '%',
                    'top': this.yPosition +'%' },
            alt: 'cannon ball img'
        }
        this.ball = $( '<img>', this.configObj );
        $( '#mainScreen' ).append(this.ball );
        this.selector = $( '#'+this.randomID );
    }
    movement(){
        
    }
}
