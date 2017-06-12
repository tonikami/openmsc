"use strict";

ui.gridZoom = 1;

ui.setGridZoom = function( zm, xpx ) {
	zm = Math.min( Math.max( 1, zm ), 8 );
	var zmMul = zm / ui.gridZoom;

	ui.gridZoom = zm;
	ui.gridEm *= zmMul;
	ui.dom.gridEm.style.fontSize = zm + "em";
	ui.dom.grid.dataset.sampleSize =
		ui.gridEm < 40 ? "small" :
		ui.gridEm < 80 ? "medium" : "big";
	ui.setTrackLinesLeft( xpx - ( -ui.trackLinesLeft + xpx ) * zmMul );
	ui.timeline.update();
	ui.tracksBg.update();
};
