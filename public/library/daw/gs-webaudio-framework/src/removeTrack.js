"use strict";

gswaFramework.do.removeTrack = function( trackObject ) {
	var ind = this.tracks.findIndex( function( trk ) { return trk === trackObject; } );

	if ( ind > -1 ) {
		this.tracks.splice( ind, 1 );
		this.on.removeTrack( trackObject );
	}
};
