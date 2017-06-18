"use strict";

gswaFramework.do.addSource = function( sourceObject ) {
	var bufSmp = new gswaBufferSample();

	sourceObject.bufferSample = bufSmp;
	bufSmp.setContext( this.audiocontext );
	bufSmp.setMetadata( sourceObject.metadata );
	this.sources.push( sourceObject );
	sourceObject.userData = this.on.addSource( sourceObject );
};
