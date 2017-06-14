(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.visual,depth0,{"name":"visual","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.menu,depth0,{"name":"menu","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.panel,depth0,{"name":"panel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.grid,depth0,{"name":"grid","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gsuiPopup,depth0,{"name":"gsuiPopup","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.templateCloned,depth0,{"name":"templateCloned","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gridblockSample,depth0,{"name":"gridblockSample","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.historyAction,depth0,{"name":"historyAction","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.itemBuffer,depth0,{"name":"itemBuffer","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['bpm'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"bpm\" class=\"border inshadow\" title=\"Beats per minute (Scroll to change)\">\n	<span class=\"text\">\n		<a class=\"bpmLink\">\n			<span id=\"bpmInt\"></span>\n			<span id=\"bpmDec\"></span>\n		</a>\n		<span class=\"unit\">bpm</span>\n	</span>\n</div>\n";
},"useData":true});
templates['clock'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"clock\">\n	<span id=\"clockMin\"></span>\n	<span id=\"clockSec\"></span>\n	<span id=\"clockMs\"></span>\n	<a id=\"clockUnits\" href=\"#\">\n		<span class=\"s\">sec</span>\n		<span class=\"b\">beat</span>\n	</a>\n</div>\n";
},"useData":true});
templates['grid'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"grid\">\n	<div id=\"gridEm\">\n		<div id=\"gridHeader\">\n"
    + ((stack1 = container.invokePartial(partials.timeline,depth0,{"name":"timeline","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n		<div id=\"tracks\">\n			<div id=\"gridCols\">\n				<div id=\"tracksNames\" class=\"colA\">\n					<div class=\"extend\" data-mousemove-fn=\"trackNames\"></div>\n				</div>\n				<div id=\"gridColB\">\n					<div id=\"tracksBg\"></div>\n"
    + ((stack1 = container.invokePartial(partials.gridcontent,depth0,{"name":"gridcontent","data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['gridcontent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"gridcontent\">\n	<div id=\"currentTimeCursor\"></div>\n</div>\n";
},"useData":true});
templates['history'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"history\">\n	<nav>\n		<span class=\"title\">History</span>\n		<a id=\"btnUndo\" class=\"btn icon fw undo\" title=\"Undo (Ctrl + Z)\"></a>\n		<a id=\"btnRedo\" class=\"btn icon fw redo\" title=\"Redo (Ctrl + Shift + Z)\"></a>\n	</nav>\n	<div id=\"historyList\" class=\"list\"></div>\n</section>\n";
},"useData":true});
templates['menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"menu\">\n	<a id=\"btnPlay\" class=\"btn border inshadow icon play\" title=\"Play/pause (press Space, hold Ctrl for pause)\"></a>\n	<a id=\"btnStop\" class=\"btn border inshadow icon stop\" title=\"Stop (press Space)\"></a>\n"
    + ((stack1 = container.invokePartial(partials.bpm,depth0,{"name":"bpm","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.save,depth0,{"name":"save","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<a data-option=\"magnet\" id=\"btnMagnet\" class=\"btn small icon fw magnet\" title=\"Toggle magnetism (press G)\"></a>\n	<div class=\"sep\"></div>\n	<a data-tool=\"select\" class=\"btn small icon fw select\" title=\"Select (hold Shift or press V)\"></a>\n	<a data-tool=\"paint\"  class=\"btn small icon fw paint\"  title=\"Paint (press B)\"></a>\n	<a data-tool=\"delete\" class=\"btn small icon fw delete\" title=\"Delete (press D)\"></a>\n	<a data-tool=\"mute\"   class=\"btn small icon fw mute\"   title=\"Mute (press M)\" style=\"display: none;\"></a>\n	<a data-tool=\"slip\"   class=\"btn small icon fw slip\"   title=\"Slip (press S)\"></a>\n	<a data-tool=\"cut\"    class=\"btn small icon fw cut\"    title=\"Cut (press C)\"></a>\n	<a data-tool=\"hand\"   class=\"btn small icon fw hand\"   title=\"Hand (hold Alt or press H)\"></a>\n	<a data-tool=\"zoom\"   class=\"btn small icon fw zoom\"   title=\"Zoom (hold Ctrl or press Z)\"></a>\n	<div class=\"flex1\"></div>\n	<a href=\"..\" target=\"_blank\" class=\"btn small icon fw question\" title=\"About\"></a>\n</div>\n";
},"usePartial":true,"useData":true});
templates['panel-files'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"files\">\n	<input id=\"filesInput\" type=\"file\"/>\n	<div id=\"filesCursor\" class=\"cursor\"></div>\n	<nav id=\"filesFilters\">\n		<a href=\"#\" class=\"used\">Used</a>\n		<a href=\"#\" class=\"loaded\">Loaded</a>\n		<a href=\"#\" class=\"unloaded\">Unloaded</a>\n	</nav>\n	<div id=\"filesList\" class=\"list\"></div>\n	<div class=\"placeholder\">\n		<i class=\"icon file-audio\"></i><br/>\n		<b>Drop audio files here</b>\n	</div>\n</section>\n";
},"useData":true});
templates['panel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"panel\">\n	<div class=\"extend\" data-mousemove-fn=\"panel\"></div>\n"
    + ((stack1 = container.invokePartial(partials.history,depth0,{"name":"history","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["panel-files"],depth0,{"name":"panel-files","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['save'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"save\" class=\"border\">\n	<a data-edit=\"save\" class=\"btn inshadow icon fw save\" title=\"Save (Ctrl + S)\"></a>\n	<input id=\"saveCheckbox\" type=\"checkbox\"/>\n	<label for=\"saveCheckbox\" class=\"btn inshadow caret icon fw\" title=\"Compositions list\"></label>\n	<div class=\"dropdown\">\n		<div class=\"title\">Current composition :</div>\n		<a href=\"#\" id=\"exportToWaveFile\">Export to Wave file</a>\n		<div class=\"title\">All compositions :</div>\n		<div class=\"list\"></div>\n	</div>\n</div>\n";
},"useData":true});
templates['saveComposition'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"saveComposition\">\n	<div class=\"name\"></div>\n	<span class=\"bpm\"></span>\n	<span class=\"duration\"></span>\n</a>\n";
},"useData":true});
templates['templateCloned'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"templateCloned\"></div>\n";
},"useData":true});
templates['timeline'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"timeline\">\n	<span id=\"currentTimeArrow\" class=\"icon caret-down\"></span>\n"
    + ((stack1 = container.invokePartial(partials.timelineLoop,depth0,{"name":"timelineLoop","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div id=\"timelineBeats\"></div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['timelineBeat'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span class=\"timelineBeat\">\n	<span></span>\n</span>\n";
},"useData":true});
templates['timelineLoop'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"timelineLoop\">\n	<div class=\"time a\"></div>\n	<div class=\"time b\"></div>\n</div>\n";
},"useData":true});
templates['track'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"track\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiToggle,depth0,{"name":"gsuiToggle","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gsuiSpanEditable,depth0,{"name":"gsuiSpanEditable","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['visual'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"visual\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiOscilloscope,depth0,{"name":"gsuiOscilloscope","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div class=\"columns\">\n		<div class=\"cell-btn\"><a id=\"btnHistory\" class=\"btn icon fw history\" title=\"History (undo/redo)\"></a></div>\n		<div class=\"cell-btn\"><a id=\"btnFiles\" class=\"btn icon fw files\" title=\"Audio files\"></a></div>\n		<div class=\"cell-clock\">\n"
    + ((stack1 = container.invokePartial(partials.clock,depth0,{"name":"clock","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['gridblockSample'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<template id=\"gridblockSample\">\n	<div class=\"gridblock sample\">\n		<div class=\"content\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n		<div class=\"header\">\n			<i class=\"icon music\"></i>\n			<b class=\"name gsui-textOverflow\"></b>\n		</div>\n		<div class=\"crop start\"></div>\n		<div class=\"crop end\"></div>\n	</div>\n</template>\n";
},"usePartial":true,"useData":true});
templates['historyAction'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template id=\"historyAction\">\n	<a class=\"historyAction\">\n		<i class=\"icon fw circle\"></i>\n		<i class=\"icon fw type\"></i>\n		<b class=\"title\"></b>\n		<span class=\"text\"></span>\n	</a>\n</template>\n";
},"useData":true});
templates['itemBuffer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<template id=\"itemBuffer\">\n	<a class=\"item buffer unloaded\" draggable=\"true\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		<div class=\"info text-overflow\">\n			<i class=\"icon fw question\"></i>\n			<span class=\"name\"></span>\n		</div>\n	</a>\n</template>\n";
},"usePartial":true,"useData":true});
templates['partials/bpm'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"bpm\" class=\"border inshadow\" title=\"Beats per minute (Scroll to change)\">\n	<span class=\"text\">\n		<a class=\"bpmLink\">\n			<span id=\"bpmInt\"></span>\n			<span id=\"bpmDec\"></span>\n		</a>\n		<span class=\"unit\">bpm</span>\n	</span>\n</div>\n";
},"useData":true});
templates['partials/clock'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"clock\">\n	<span id=\"clockMin\"></span>\n	<span id=\"clockSec\"></span>\n	<span id=\"clockMs\"></span>\n	<a id=\"clockUnits\" href=\"#\">\n		<span class=\"s\">sec</span>\n		<span class=\"b\">beat</span>\n	</a>\n</div>\n";
},"useData":true});
templates['partials/grid'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"grid\">\n	<div id=\"gridEm\">\n		<div id=\"gridHeader\">\n"
    + ((stack1 = container.invokePartial(partials.timeline,depth0,{"name":"timeline","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n		<div id=\"tracks\">\n			<div id=\"gridCols\">\n				<div id=\"tracksNames\" class=\"colA\">\n					<div class=\"extend\" data-mousemove-fn=\"trackNames\"></div>\n				</div>\n				<div id=\"gridColB\">\n					<div id=\"tracksBg\"></div>\n"
    + ((stack1 = container.invokePartial(partials.gridcontent,depth0,{"name":"gridcontent","data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['partials/gridcontent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"gridcontent\">\n	<div id=\"currentTimeCursor\"></div>\n</div>\n";
},"useData":true});
templates['partials/history'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"history\">\n	<nav>\n		<span class=\"title\">History</span>\n		<a id=\"btnUndo\" class=\"btn icon fw undo\" title=\"Undo (Ctrl + Z)\"></a>\n		<a id=\"btnRedo\" class=\"btn icon fw redo\" title=\"Redo (Ctrl + Shift + Z)\"></a>\n	</nav>\n	<div id=\"historyList\" class=\"list\"></div>\n</section>\n";
},"useData":true});
templates['partials/menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"menu\">\n	<a id=\"btnPlay\" class=\"btn border inshadow icon play\" title=\"Play/pause (press Space, hold Ctrl for pause)\"></a>\n	<a id=\"btnStop\" class=\"btn border inshadow icon stop\" title=\"Stop (press Space)\"></a>\n"
    + ((stack1 = container.invokePartial(partials.bpm,depth0,{"name":"bpm","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.save,depth0,{"name":"save","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<a data-option=\"magnet\" id=\"btnMagnet\" class=\"btn small icon fw magnet\" title=\"Toggle magnetism (press G)\"></a>\n	<div class=\"sep\"></div>\n	<a data-tool=\"select\" class=\"btn small icon fw select\" title=\"Select (hold Shift or press V)\"></a>\n	<a data-tool=\"paint\"  class=\"btn small icon fw paint\"  title=\"Paint (press B)\"></a>\n	<a data-tool=\"delete\" class=\"btn small icon fw delete\" title=\"Delete (press D)\"></a>\n	<a data-tool=\"mute\"   class=\"btn small icon fw mute\"   title=\"Mute (press M)\" style=\"display: none;\"></a>\n	<a data-tool=\"slip\"   class=\"btn small icon fw slip\"   title=\"Slip (press S)\"></a>\n	<a data-tool=\"cut\"    class=\"btn small icon fw cut\"    title=\"Cut (press C)\"></a>\n	<a data-tool=\"hand\"   class=\"btn small icon fw hand\"   title=\"Hand (hold Alt or press H)\"></a>\n	<a data-tool=\"zoom\"   class=\"btn small icon fw zoom\"   title=\"Zoom (hold Ctrl or press Z)\"></a>\n	<div class=\"flex1\"></div>\n	<a href=\"..\" target=\"_blank\" class=\"btn small icon fw question\" title=\"About\"></a>\n</div>\n";
},"usePartial":true,"useData":true});
templates['partials/panel-files'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"files\">\n	<input id=\"filesInput\" type=\"file\"/>\n	<div id=\"filesCursor\" class=\"cursor\"></div>\n	<nav id=\"filesFilters\">\n		<a href=\"#\" class=\"used\">Used</a>\n		<a href=\"#\" class=\"loaded\">Loaded</a>\n		<a href=\"#\" class=\"unloaded\">Unloaded</a>\n	</nav>\n	<div id=\"filesList\" class=\"list\"></div>\n	<div class=\"placeholder\">\n		<i class=\"icon file-audio\"></i><br/>\n		<b>Drop audio files here</b>\n	</div>\n</section>\n";
},"useData":true});
templates['partials/panel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"panel\">\n	<div class=\"extend\" data-mousemove-fn=\"panel\"></div>\n"
    + ((stack1 = container.invokePartial(partials.history,depth0,{"name":"history","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["panel-files"],depth0,{"name":"panel-files","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['partials/save'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"save\" class=\"border\">\n	<a data-edit=\"save\" class=\"btn inshadow icon fw save\" title=\"Save (Ctrl + S)\"></a>\n	<input id=\"saveCheckbox\" type=\"checkbox\"/>\n	<label for=\"saveCheckbox\" class=\"btn inshadow caret icon fw\" title=\"Compositions list\"></label>\n	<div class=\"dropdown\">\n		<div class=\"title\">Current composition :</div>\n		<a href=\"#\" id=\"exportToWaveFile\">Export to Wave file</a>\n		<div class=\"title\">All compositions :</div>\n		<div class=\"list\"></div>\n	</div>\n</div>\n";
},"useData":true});
templates['partials/saveComposition'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"saveComposition\">\n	<div class=\"name\"></div>\n	<span class=\"bpm\"></span>\n	<span class=\"duration\"></span>\n</a>\n";
},"useData":true});
templates['partials/templateCloned'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"templateCloned\"></div>\n";
},"useData":true});
templates['partials/timeline'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"timeline\">\n	<span id=\"currentTimeArrow\" class=\"icon caret-down\"></span>\n"
    + ((stack1 = container.invokePartial(partials.timelineLoop,depth0,{"name":"timelineLoop","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div id=\"timelineBeats\"></div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['partials/timelineBeat'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span class=\"timelineBeat\">\n	<span></span>\n</span>\n";
},"useData":true});
templates['partials/timelineLoop'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"timelineLoop\">\n	<div class=\"time a\"></div>\n	<div class=\"time b\"></div>\n</div>\n";
},"useData":true});
templates['partials/track'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"track\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiToggle,depth0,{"name":"gsuiToggle","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gsuiSpanEditable,depth0,{"name":"gsuiSpanEditable","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['partials/visual'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"visual\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiOscilloscope,depth0,{"name":"gsuiOscilloscope","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div class=\"columns\">\n		<div class=\"cell-btn\"><a id=\"btnHistory\" class=\"btn icon fw history\" title=\"History (undo/redo)\"></a></div>\n		<div class=\"cell-btn\"><a id=\"btnFiles\" class=\"btn icon fw files\" title=\"Audio files\"></a></div>\n		<div class=\"cell-clock\">\n"
    + ((stack1 = container.invokePartial(partials.clock,depth0,{"name":"clock","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['templates/gridblockSample'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<template id=\"gridblockSample\">\n	<div class=\"gridblock sample\">\n		<div class=\"content\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n		<div class=\"header\">\n			<i class=\"icon music\"></i>\n			<b class=\"name gsui-textOverflow\"></b>\n		</div>\n		<div class=\"crop start\"></div>\n		<div class=\"crop end\"></div>\n	</div>\n</template>\n";
},"usePartial":true,"useData":true});
templates['templates/historyAction'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<template id=\"historyAction\">\n	<a class=\"historyAction\">\n		<i class=\"icon fw circle\"></i>\n		<i class=\"icon fw type\"></i>\n		<b class=\"title\"></b>\n		<span class=\"text\"></span>\n	</a>\n</template>\n";
},"useData":true});
templates['templates/itemBuffer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<template id=\"itemBuffer\">\n	<a class=\"item buffer unloaded\" draggable=\"true\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		<div class=\"info text-overflow\">\n			<i class=\"icon fw question\"></i>\n			<span class=\"name\"></span>\n		</div>\n	</a>\n</template>\n";
},"usePartial":true,"useData":true});
})();