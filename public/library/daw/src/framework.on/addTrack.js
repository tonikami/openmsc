"use strict";

( function() {

waFwk.on.addTrack = function( trkObject ) {
	return new Track();
};

function Track() {
	var that = this;

	this.id = waFwk.tracks.length - 1;
	this.name = "";
	this.samples = [];
	this.elColNamesTrack = ui.createHTML( Handlebars.templates.track() )[ 0 ];
	this.elColLinesTrack = ui.createHTML( "<div class='track'>" )[ 0 ];
	this.elColNamesTrack.uitrack
	this.elColLinesTrack.uitrack = this;
	this.wfilters = gs.wctx.createFilters();

	ui.dom.tracksNames.appendChild( this.elColNamesTrack );
	ui.dom.tracksLines.appendChild( this.elColLinesTrack );

	this.gsuiToggle = new gsuiToggle(
		this.elColNamesTrack.querySelector( ".gsuiToggle" ), {
		onchange: function( b ) {
			that.isOn = b;
			that.wfilters.gain( +b );
			that.elColNamesTrack.classList.toggle( "off", !b );
			that.elColLinesTrack.classList.toggle( "off", !b );
		}
	} );

	this.gsuiSpanEditable = new gsuiSpanEditable(
		this.elColNamesTrack.querySelector( ".gsuiSpanEditable" ), {
		onchange: function( val ) {
			that.name = val;
		}
	} );

	if ( waFwk.tracks.length > 1 ) {
		this.gsuiToggle.groupWith( waFwk.tracks[ 0 ].userData.gsuiToggle );
	}
	this.gsuiSpanEditable.setPlaceholder( "Track " + ( this.id + 1 ) );
	this.toggle( true );
	this.editName( "" );
};

Track.prototype = {
	toggle: function( b ) {
		this.gsuiToggle.toggle( b );
	},
	editName: function( name ) {
		this.gsuiSpanEditable.setValue( name );
	},
	removeSample: function( smp ) {
		var ind = this.samples.indexOf( smp );

		ind > -1 && this.samples.splice( ind, 1 );
	}
};

} )();
