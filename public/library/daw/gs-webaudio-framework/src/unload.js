"use strict";

gswaFramework.do.unload = function() {
	var currCmp = this.currentComposition;

	if ( currCmp ) {
		this.currentComposition = null;
		this.on.unload( currCmp );
	}
};
