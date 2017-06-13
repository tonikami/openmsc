"use strict";

ui.init( document.querySelector( "#app" ), "_app", {} );

ui.dom.toolBtns = Array.from( ui.dom.menu.querySelectorAll( ".btn2[data-tool]" ) );
ui.tool = {};
ui.tracks = [];
ui.gridEm = parseFloat( getComputedStyle( ui.dom.grid ).fontSize );
ui.gridColsY = ui.dom.gridCols.getBoundingClientRect().top;
ui.gsuiPopup = new gsuiPopup( document.querySelector( ".gsuiPopup" ) );
