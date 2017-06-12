"use strict";

gswaFramework.do.setBPM = function( bpm ) {
	bpm = Math.max( 1, Math.min( bpm, 999.999 ) );
	this.sampleGroup.stretch( this.bpm / bpm );
	this.bpm = bpm;
	this.on.setBPM( bpm );
};
