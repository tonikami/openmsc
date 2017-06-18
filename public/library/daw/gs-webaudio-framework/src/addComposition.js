"use strict";

gswaFramework.do.addComposition = function( cmpObject ) {
	this.compositions.push( cmpObject );
	cmpObject.userData = this.on.addComposition( cmpObject );
};
