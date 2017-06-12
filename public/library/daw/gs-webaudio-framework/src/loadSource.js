"use strict";

gswaFramework.do.loadSource = function( sourceObject ) {
	var that = this,
		bufSmp = sourceObject.bufferSample,
		data = sourceObject.data;

	if ( data ) {
		return ( typeof data === "string"
			? bufSmp.setDataFromURL( data )
			: bufSmp.setDataFromBlob( data )
		).then( function() {
			that.on.loadSource( sourceObject );
			return sourceObject;
		} );
	}
};
