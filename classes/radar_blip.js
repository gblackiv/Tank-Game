class Blip{
	constructor( blipConfigObj ){
		this.radar = blipConfigObj.radar;
		this.blipSelector = null;
		this.blipRenderObj = {
			class: 'blip',
			css: {
				left: `${50 + blipConfigObj.left}%`,
				top: `${50 + blipConfigObj.top}%`
			}
		}
	}
	lifeCycle(){
		this.blipSelector.animate({
			opacity: 0
		}, 1500,
		() => {
			this.blipSelector.remove();
		});
	}
	render(){
		this.blipSelector = $( '<div>', this.blipRenderObj );
		this.radar.append( this.blipSelector );
		this.lifeCycle(); 
	}
}