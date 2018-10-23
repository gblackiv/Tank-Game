class Radar{
	constructor( radarConfigObj ){
		this.currentGameBoard = radarConfigObj.currentGameBoard;
		this.currentRotation = null;
		this.selector = null;

	}
	render(){
		const container = $( '<section>', {
			id: 'radarContainer'
		});
		const sweeper = $( '<div>', {
			id: 'sweeper'
		});
		container.append( sweeper );
		$( 'body' ).prepend( container );
	}
}
