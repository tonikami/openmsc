"use strict";

gswaFramework.do.loadComposition = function( cmpObject ) {
	if ( this.currentComposition !== cmpObject ) {
		this.currentComposition = cmpObject;
		this.on.loadComposition( cmpObject );
	}
};
