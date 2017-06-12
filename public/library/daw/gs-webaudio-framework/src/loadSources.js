"use strict";

gswaFramework.do.loadSources = function( sourceArray ) {
	Promise.all( sourceArray.map( this.do.loadSource ) )
		.then( this.on.loadSources );
};
