(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['_app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.visual,depth0,{"name":"visual","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.menu,depth0,{"name":"menu","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.panel,depth0,{"name":"panel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.grid,depth0,{"name":"grid","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gsuiPopup,depth0,{"name":"gsuiPopup","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['bpm'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"bpm\" class=\"border inshadow\" title=\"Beats per minute (Scroll to change)\">\n	<span class=\"text\">\n		<span class=\"bpmLink\">\n			<span id=\"bpmInt\"></span>\n			<span id=\"bpmDec\"></span>\n		</span>\n		<span class=\"unit\">bpm</span>\n	</span>\n</div>\n";
},"useData":true});
templates['clock'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"clock\">\n	<span id=\"clockMin\"></span>\n	<span id=\"clockSec\"></span>\n	<span id=\"clockMs\"></span>\n	<span id=\"clockUnits\" href=\"#\">\n		<span class=\"s\">sec</span>\n		<span class=\"b\">beat</span>\n	</span>\n</div>\n";
},"useData":true});
templates['grid'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"grid\">\n	<div id=\"gridEm\">\n		<div id=\"gridHeader\">\n"
    + ((stack1 = container.invokePartial(partials.timeline,depth0,{"name":"timeline","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n		<div id=\"tracks\">\n			<div id=\"gridCols\">\n				<div id=\"tracksNames\" class=\"colA\">\n					<div class=\"extend\" data-mousemove-fn=\"trackNames\"></div>\n				</div>\n				<div id=\"gridColB\">\n					<div id=\"tracksBg\"></div>\n					<div id=\"tracksLines\">\n						<div id=\"currentTimeCursor\"></div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['gridBlockSample'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"gridBlock sample\">\n	<div class=\"content\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n	<div class=\"header\">\n		<i class=\"icon music\"></i>\n		<b class=\"name gsui-textOverflow\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</b>\n	</div>\n	<div class=\"crop start\"></div>\n	<div class=\"crop end\"></div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['historyAction'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"task\">\n	<i class=\"icon fw circle\"></i\n	><i class=\"icon fw tool tool-"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></i\n	><b class=\"title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</b\n	><span class=\"text\">"
    + ((stack1 = ((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\n</a>\n";
},"useData":true});
templates['itemBuffer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<a class=\"item buffer\" draggable=\"true\">\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div class=\"info text-overflow\">\n		<i class=\"icon fw\"></i>\n		<span class=\"name\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n	</div>\n</a>\n";
},"usePartial":true,"useData":true});
templates['itemChange'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"list-group-item\">\n    <div class=\"row text-center\" id=\"dropdown-detail-1\" data-toggle=\"detail-1\">\n        <div class=\"col-xs-2\">\n            <div class=\"row\">\n                <span id=\"voteUp\"  class=\"fa fa-chevron-up vote-buttons\" aria-hidden=\"true\"></span>\n                <h5 id=\"voteAmount\">"
    + alias4(((helper = (helper = helpers.voteAmount || (depth0 != null ? depth0.voteAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"voteAmount","hash":{},"data":data}) : helper)))
    + "</h5>\n                <span id=\"voteDown\" class=\"fa fa-chevron-down vote-buttons\" aria-hidden=\"true\"></span>\n            </div>\n        </div>\n        <div class=\"col-xs-10 text-left\">\n            <h5><b>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</b> added "
    + alias4(((helper = (helper = helpers.blocksAmount || (depth0 != null ? depth0.blocksAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"blocksAmount","hash":{},"data":data}) : helper)))
    + " blocks</h5>\n        </div>\n    </div>\n</li>";
},"useData":true});
templates['menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"menu\">\n    <span id=\"btnPlay\" class=\"btn2 border inshadow icon play\" title=\"Play/pause (press Space, hold Ctrl for pause)\"></span>\n    <span id=\"btnStop\" class=\"btn2 border inshadow icon stop\" title=\"Stop (press Space)\"></span> "
    + ((stack1 = container.invokePartial(partials.bpm,depth0,{"name":"bpm","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + " "
    + ((stack1 = container.invokePartial(partials.save,depth0,{"name":"save","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n    <a data-option=\"magnet\" id=\"btnMagnet\" class=\"btn2 small icon fw magnet\" title=\"Toggle magnetism (press G)\"></a>\n    <div class=\"sep\"></div>\n    <a data-tool=\"select\" class=\"btn2 small icon fw tool-select\" title=\"Select (hold Shift or press V)\"></a>\n    <a data-tool=\"paint\" class=\"btn2 small icon fw tool-paint\" title=\"Paint (press B)\"></a>\n    <a data-tool=\"delete\" class=\"btn2 small icon fw tool-delete\" title=\"Delete (press D)\"></a>\n    <a data-tool=\"mute\" class=\"btn2 small icon fw tool-mute\" title=\"Mute (press M)\" style=\"display: none;\"></a>\n    <a data-tool=\"slip\" class=\"btn2 small icon fw tool-slip\" title=\"Slip (press S)\"></a>\n    <a data-tool=\"cut\" class=\"btn2 small icon fw tool-cut\" title=\"Cut (press C)\"></a>\n    <a data-tool=\"hand\" class=\"btn2 small icon fw tool-hand\" title=\"Hand (hold Alt or press H)\"></a>\n    <a data-tool=\"zoom\" class=\"btn2 small icon fw tool-zoom\" title=\"Zoom (hold Ctrl or press Z)\"></a>\n    <div class=\"flex1\"></div>\n\n    <span class=\"text\" style=\"margin-right: 10px;\" id=\"accountArea_SignedOut\">\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"btnLogin\" data-toggle=\"modal\" data-target=\"#loginModal\" style=\"background: #214656; margin-right: 10px;\"> Login </button>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\"  id=\"btnRegister\" data-toggle=\"modal\" data-target=\"#registerModal\" style=\"background: #214656\"> Register </button>\n    </span>\n\n    <span class=\"text\" style=\"margin-right: 10px;\" id=\"accountArea_SignedIn\">\n        <span id=\"loggedInUsername\"></span>\n    <button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"btnLogout\" style=\"background: #214656\"> Logout </button>\n    </span>\n\n    <div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-sm\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <h4 class=\"modal-title\">Login</h4> </div>\n                <div class=\"modal-body\">\n                    <fieldset>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"Username\" name=\"username\" type=\"text\" id=\"lUsername\"> </div>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\" id=\"lPassword\"> </div>\n                        <button class=\"btn btn-lg btn-success btn-block\" id=\"btnLoginAccount\">Login</button>\n                    </fieldset>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"registerModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-sm\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <h4 class=\"modal-title\">Register</h4> </div>\n                <div class=\"modal-body\">\n                    <fieldset>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"Username\" name=\"username\" type=\"text\" id=\"rUsername\"> </div>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"E-mail\" name=\"email\" type=\"text\" id=\"rEmail\"> </div>\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\" id=\"rPassword\"> </div>\n                        <button class=\"btn btn-lg btn-success btn-block\" id=\"btnCreateAccount\"> Create Account </button>\n                    </fieldset>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"usePartial":true,"useData":true});
templates['panel-files'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"files\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">Recent Changes</h3>\n        </div>\n        <ul id=\"changesList\" class=\"list-group\">\n        </ul>\n    </div>\n    <div>\n        <input id=\"filesInput\" type=\"file\" />\n        <div id=\"filesCursor\" class=\"cursor\"></div>\n        <nav id=\"filesFilters\">\n            <a href=\"#\" class=\"used\">Used</a>\n            <a href=\"#\" class=\"loaded\">Loaded</a>\n            <a href=\"#\" class=\"unloaded\">Unloaded</a>\n        </nav>\n        <div id=\"filesList\" class=\"list\"></div>\n        <div class=\"placeholder\">\n            <i class=\"icon file-audio\"></i>\n            <br/>\n            <b>Drop audio files here</b>\n        </div>\n    </div>\n</section>";
},"useData":true});
templates['panel-history'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"history\">\n	<nav>\n		<span class=\"title\">History</span>\n		<a id=\"btnUndo\" class=\"btn icon fw undo\" title=\"Undo (Ctrl + Z)\"></a>\n		<a id=\"btnRedo\" class=\"btn icon fw redo\" title=\"Redo (Ctrl + Shift + Z)\"></a>\n	</nav>\n	<div id=\"historyList\" class=\"list\"></div>\n</section>\n";
},"useData":true});
templates['panel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"panel\">\n	<div class=\"extend\" data-mousemove-fn=\"panel\"></div>\n"
    + ((stack1 = container.invokePartial(partials["panel-history"],depth0,{"name":"panel-history","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["panel-files"],depth0,{"name":"panel-files","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['save'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"save\" class=\"border\">\n    <button  data-edit=\"save\" type=\"button\" class=\"btn btn-primary save_changes\">Save Changes</button>\n\n<!--\n    <span data-edit=\"save\" class=\"btn2 inshadow icon fw save\" title=\"Save (Ctrl + S)\"></span>\n    <h5>Save</h5>\n-->\n    <input id=\"saveCheckbox\" type=\"checkbox\" />\n    <label for=\"saveCheckbox\" mak></label>\n    <div class=\"dropdown\">\n        <div class=\"title\">Current composition :</div>\n        <a href=\"#\" id=\"exportToWaveFile\">Export to Wave file</a>\n        <div class=\"title\">All compositions :</div>\n        <div class=\"list\"></div>\n    </div>\n</div>";
},"useData":true});
templates['saveComposition'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"saveComposition\">\n	<div class=\"name\"></div>\n	<span class=\"bpm\"></span>\n	<span class=\"duration\"></span>\n</a>\n";
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
    + "	<div class=\"columns\">\n		<div class=\"cell-btn\"><a id=\"btnHistory\" class=\"btn2 icon fw history\" title=\"History (undo/redo)\"></a></div>\n		<div class=\"cell-btn\"><a id=\"btnFiles\" class=\"btn2 icon fw files\" title=\"Audio files\"></a></div>\n		<div class=\"cell-clock\">\n"
    + ((stack1 = container.invokePartial(partials.clock,depth0,{"name":"clock","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
})();