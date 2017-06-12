"use strict";

gswaFramework.do.addTrack = function( trkObject ) {
	this.tracks.push( trkObject );
	trkObject.userData = this.on.addTrack( trkObject );
};
