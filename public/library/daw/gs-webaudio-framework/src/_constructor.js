"use strict";

function gswaFramework() {
	this.audioContext = new AudioContext();
	this.sampleGroup = new gswaSampleGroup();
	this.compositions = [];
	this.sources = [];
	this.tracks = [];
	this.on = {};
	this.do = {};
	this.currentComposition = null;
	this.bpm = 60;

	for ( var meth in gswaFramework.do ) {
		this.do[ meth ] = gswaFramework.do[ meth ].bind( this );
		this.on[ meth ] = function() {};
	}
}

gswaFramework.do = {};
