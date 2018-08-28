class Tank extends ScreenObjects{
    constructor( tankOptions ){
        super(tankOptions);
        this.randomID = 'tank' + Math.floor(Math.random() * 1000);
        this.configObj = {'class': 'tank', 
                            id: this.randomID,
                            src: this.img,
                            css: {'top': this.yPosition+'%', left: this.xPosition+'%'},
                            alt: 'tank Img'}
        this.tank = $('<img>', this.configObj);
        $('#mainScreen').append(this.tank);
        this.selector = $('#'+this.randomID);
    }
    shoot(){
        console.log('BANG!');
        shotsFired.push(new CannonBall( {xPosition: this.xPosition, 
                                        yPosition: this.yPosition, 
                                        img: 'images/cannonBall.jpg',} ));
        console.log(shotsFired[0])
    }
    turnLeft(){
        this.angleOfDirection -= 10;
        this.configObj['css']['transform'] = 'rotate('+this.angleOfDirection+'deg)';
        this.selector.css(this.configObj['css']);
    }
    turnRight(){
        this.angleOfDirection += 10;
        this.configObj['css']['transform'] = 'rotate('+this.angleOfDirection+'deg)';
        this.selector.css(this.configObj['css']);
    }
    moveReverse(){

    }
    // moveLeft(){
    //     this.xPosition -= 1.25;
    //     this.configObj['css']['left'] = this.xPosition+'%';
    //     this.selector.css(this.configObj['css']);
        
    // }
    // moveRight(){
    //     this.xPosition += 1.25;
    //     this.configObj['css']['left'] = this.xPosition+'%';
    //     this.selector.css(this.configObj['css']);
    // }
    // moveUp(){
    //     this.yPosition -= 1.25;
    //     this.configObj['css']['top'] = this.yPosition+'%';
    //     this.selector.css(this.configObj['css']);
    // }
    // moveDown(){
    //     this.yPosition += 1.25;
    //     this.configObj['css']['top'] = this.yPosition+'%';
    //     this.selector.css(this.configObj['css']);
    // }

}