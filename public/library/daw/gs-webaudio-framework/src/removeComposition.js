"use strict";

gswaFramework.do.removeComposition = function( cmpObject ) {
	var ind = this.compositions.findIndex( function( cmp ) { return cmp === cmpObject } );

	if ( ind > -1 ) {
		this.compositions.splice( ind, 1 );
		this.on.removeComposition( cmpObject );
	}
};
