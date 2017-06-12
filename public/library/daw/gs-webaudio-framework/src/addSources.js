"use strict";

gswaFramework.do.addSources = function( sourceArray ) {
	sourceArray.forEach( this.do.addSource );
	this.on.addSources( sourceArray );
};
