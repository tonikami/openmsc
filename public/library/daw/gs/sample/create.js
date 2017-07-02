"use strict";

gs.sample.create = function( gsfile, meta_data = {new: true} ) {
	var smp = gs.wctx.createSample( gsfile.wbuff );
    smp.meta_data = meta_data;
        
	if ( !gsfile.wbuff.buffer ) {
		gsfile.wbuff._setDuration( gsfile.bufferDuration );
	}
	smp.data = {
		selected: false,
		gsfile: gsfile,
	};
	++gsfile.nbSamples;
	ui.file.used( gsfile );
	ui.sample.create( smp );
	ui.sample.duration( smp );
	return smp;
};
