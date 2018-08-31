
class Sound{
    constructor(src){
        this.sound = document.createElement( "audio" );
        this.sound.src = src;
        this.sound.setAttribute( "preload", "auto" );
        this.sound.setAttribute( "controls", "none" );
        this.sound.style.display = "none";
        $( 'body' ).append( this.sound );
    }
    play(){
        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }
}
var soundsObj = {
    tankCannon: new Sound('sounds/tankCannon.flac'),
    tankDeath: new Sound('sounds/tankDeath.mp3')
}
