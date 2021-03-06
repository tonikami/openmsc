(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bpm'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"bpm\" class=\"border inshadow\" title=\"Beats per minute (Scroll to change)\">\r\n	<span class=\"text\">\r\n		<span class=\"bpmLink\">\r\n			<span id=\"bpmInt\"></span>\r\n			<span id=\"bpmDec\"></span>\r\n		</span>\r\n		<span class=\"unit\">bpm</span>\r\n	</span>\r\n</div>\r\n";
},"useData":true});
templates['clock'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"clock\">\r\n	<span id=\"clockMin\"></span>\r\n	<span id=\"clockSec\"></span>\r\n	<span id=\"clockMs\"></span>\r\n	<span id=\"clockUnits\" href=\"#\">\r\n		<span class=\"s\">sec</span>\r\n		<span class=\"b\">beat</span>\r\n	</span>\r\n</div>\r\n";
},"useData":true});
templates['grid'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"grid\">\r\n	<div id=\"gridEm\">\r\n		<div id=\"gridHeader\">\r\n"
    + ((stack1 = container.invokePartial(partials.timeline,depth0,{"name":"timeline","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\r\n		<div id=\"tracks\">\r\n			<div id=\"gridCols\">\r\n				<div id=\"tracksNames\" class=\"colA\">\r\n					<div class=\"extend\" data-mousemove-fn=\"trackNames\"></div>\r\n				</div>\r\n				<div id=\"gridColB\">\r\n					<div id=\"tracksBg\"></div>\r\n					<div id=\"tracksLines\">\r\n						<div id=\"currentTimeCursor\"></div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['gridBlockSample'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"gridBlock sample\">\r\n	<div class=\"content\">\r\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\r\n	<div class=\"header\">\r\n		<i class=\"icon music\"></i>\r\n		<b class=\"name gsui-textOverflow\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</b>\r\n	</div>\r\n	<div class=\"crop start\"></div>\r\n	<div class=\"crop end\"></div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['historyAction'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"task\">\r\n	<i class=\"icon fw circle\"></i\r\n	><i class=\"icon fw tool tool-"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></i\r\n	><b class=\"title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</b\r\n	><span class=\"text\">"
    + ((stack1 = ((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\r\n</a>\r\n";
},"useData":true});
templates['instantMessenger'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"instantMessenger\" class=\"chat_window normal\">\r\n    <div class=\"top_menu\">\r\n        <div class=\"title\">Chat</div>\r\n    </div>\r\n    <div class=\"messangerBody\">\r\n        <ul class=\"messages\"></ul>\r\n        <div class=\"bottom_wrapper clearfix\">\r\n            <div class=\"message_input_wrapper\">\r\n                <input class=\"message_input\" placeholder=\"Type your message here...\" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"message_template\">\r\n    <li class=\"message\">\r\n        <div class=\"avatar\"></div>\r\n        <div class=\"text_wrapper\">\r\n            <div class=\"usernameText\"></div>\r\n            <div class=\"text\"></div>\r\n        </div>\r\n    </li>\r\n</div>\r\n";
},"useData":true});
templates['itemBuffer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<a class=\"item buffer\" draggable=\"true\">\r\n"
    + ((stack1 = container.invokePartial(partials.gsuiWaveform,depth0,{"name":"gsuiWaveform","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div>\r\n        <div class=\"info text-overflow\">\r\n            <i class=\"icon fw\"></i>\r\n            <span class=\"name\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"keyDetails\" style=\"position: relative; color: gray; font-size: 0.7em;\">\r\n            Right click to assign a key\r\n        </div>\r\n    </div>\r\n</a>\r\n";
},"usePartial":true,"useData":true});
templates['itemChange'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"list-group-item\" style=\"background: #2a2a2a; color: #ccc; border-color:black;\">\r\n    <div class=\"row text-center\" id=\"dropdown-detail-1\" data-toggle=\"detail-1\" style=\"height: 70px;\">\r\n        <div class=\"col-xs-2 align-middle\" style=\"height: 100%;\">\r\n            <div class=\"row\">\r\n                <span id=\"voteUp\" class=\"fa fa-chevron-up vote-buttons\" aria-hidden=\"true\"></span>\r\n                <h5 id=\"voteAmount\">"
    + alias4(((helper = (helper = helpers.voteAmount || (depth0 != null ? depth0.voteAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"voteAmount","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                <span id=\"voteDown\" class=\"fa fa-chevron-down vote-buttons\" aria-hidden=\"true\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-xs-10 text-left align-middle\" style=\"height: 100%;\">\r\n            <table style=\"height: 100%;\">\r\n                <tbody>\r\n                    <tr>\r\n                        <td class=\"align-middle\">\r\n                            <h5><b>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</b> added "
    + alias4(((helper = (helper = helpers.blocksAmount || (depth0 != null ? depth0.blocksAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"blocksAmount","hash":{},"data":data}) : helper)))
    + " blocks</h5>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</li>";
},"useData":true});
templates['menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"menu\">\r\n    <span id=\"btnPlay\" class=\"btn2 border inshadow icon play\" title=\"Play/pause (press Space, hold Ctrl for pause)\"></span>\r\n    <span id=\"btnStop\" class=\"btn2 border inshadow icon stop\" title=\"Stop (press Space)\"></span> "
    + ((stack1 = container.invokePartial(partials.bpm,depth0,{"name":"bpm","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + " "
    + ((stack1 = container.invokePartial(partials.save,depth0,{"name":"save","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n    <a data-option=\"magnet\" id=\"btnMagnet\" class=\"btn2 small icon fw magnet\" title=\"Toggle magnetism (press G)\"></a>\r\n    <div class=\"sep\"></div>\r\n    <a data-tool=\"select\" class=\"btn2 small icon fw tool-select\" title=\"Select (hold Shift or press V)\"></a>\r\n    <a data-tool=\"paint\" class=\"btn2 small icon fw tool-paint\" title=\"Paint (press B)\"></a>\r\n    <a data-tool=\"delete\" class=\"btn2 small icon fw tool-delete\" title=\"Delete (press D)\"></a>\r\n    <a data-tool=\"mute\" class=\"btn2 small icon fw tool-mute\" title=\"Mute (press M)\" style=\"display: none;\"></a>\r\n    <a data-tool=\"slip\" class=\"btn2 small icon fw tool-slip\" title=\"Slip (press S)\"></a>\r\n    <a data-tool=\"cut\" class=\"btn2 small icon fw tool-cut\" title=\"Cut (press C)\"></a>\r\n    <a data-tool=\"hand\" class=\"btn2 small icon fw tool-hand\" title=\"Hand (hold Alt or press H)\"></a>\r\n    <a data-tool=\"zoom\" class=\"btn2 small icon fw tool-zoom\" title=\"Zoom (hold Ctrl or press Z)\"></a>\r\n    <div class=\"flex1\"></div>\r\n\r\n    <span class=\"text\" style=\"margin-right: 10px;\" id=\"accountArea_SignedOut\">\r\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"btnLogin\" data-toggle=\"modal\" data-target=\"#loginModal\" style=\"background: #214656; margin-right: 10px;\"> Login </button>\r\n        <button type=\"button\" class=\"btn btn-primary btn-sm\"  id=\"btnRegister\" data-toggle=\"modal\" data-target=\"#registerModal\" style=\"background: #214656\"> Register </button>\r\n    </span>\r\n\r\n    <span class=\"text\" style=\"margin-right: 10px;\" id=\"accountArea_SignedIn\">\r\n        <span id=\"loggedInUsername\"></span>\r\n    <button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"btnLogout\" style=\"background: #214656\"> Logout </button>\r\n    </span>\r\n\r\n    <div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-sm\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\">Login</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <fieldset>\r\n                        <div class=\"form-group\">\r\n                            <input class=\"form-control\" placeholder=\"Username\" name=\"username\" type=\"text\" id=\"lUsername\"> </div>\r\n                        <div class=\"form-group\">\r\n                            <input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\" id=\"lPassword\"> </div>\r\n                        <button class=\"btn btn-lg btn-success btn-block\" id=\"btnLoginAccount\">Login</button>\r\n                    </fieldset>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade\" id=\"registerModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-sm\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\">Register</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <fieldset>\r\n                        <div class=\"form-group\">\r\n                            <input class=\"form-control\" placeholder=\"Username\" name=\"username\" type=\"text\" id=\"rUsername\"> </div>\r\n                        <div class=\"form-group\">\r\n                            <input class=\"form-control\" placeholder=\"E-mail\" name=\"email\" type=\"text\" id=\"rEmail\"> </div>\r\n                        <div class=\"form-group\">\r\n                            <input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\" id=\"rPassword\"> </div>\r\n                        <button class=\"btn btn-lg btn-success btn-block\" id=\"btnCreateAccount\"> Create Account </button>\r\n                    </fieldset>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"modal fade\" id=\"assignModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-sm\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n                    <h4 class=\"modal-title\">Assign a key</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <fieldset>\r\n                        <div class=\"form-group\">\r\n                            <input type=\"number\" min=\"0\" max=\"9\" class=\"form-control\" placeholder=\"key\" name=\"key\" type=\"text\" id=\"lKey\"> </div>\r\n                        <div class=\"form-group\">\r\n                            <input type=\"number\" min=\"1\" max=\"42\" class=\"form-control\" placeholder=\"track\" name=\"track\" type=\"text\" id=\"lTrack\">\r\n                            <input type=\"hidden\" id=\"lFileID\">\r\n                        </div>\r\n                        <button class=\"btn btn-lg btn-success btn-block\" id=\"btnAssignKey\">Confirm</button>\r\n                    </fieldset>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['panel-files'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"files\">\r\n    <div class=\"panel panel-default\" style=\"height: 50%; overflow-y: scroll; margin: 0px; background: #4b4b4b; border-width: 0px;\">\r\n        <div class=\"panel-heading text-center\" style=\"background: #3e3e3e\">\r\n            <a>\r\n                <h4 class=\"panel-title\">Recent Changes</h4>\r\n            </a>\r\n        </div>\r\n        <ul id=\"changesList\" class=\"list-group\">\r\n        </ul>\r\n    </div>\r\n    <div class=\"panel panel-default\" style=\"height: 50%; overflow-y: scroll; margin: 0px; background: #4b4b4b; border-width: 0px;\">\r\n        <div class=\"panel-heading text-center\" style=\"background: #3e3e3e\">\r\n            <a>\r\n                <h4 class=\"panel-title\">Sounds</h4>\r\n            </a>\r\n        </div>\r\n        <input id=\"filesInput\" type=\"file\" />\r\n        <div id=\"filesCursor\" class=\"cursor\"></div>\r\n        <nav id=\"filesFilters\">\r\n            <i class=\"icon file-audio\"></i>\r\n            <b>&nbsp Drop audio files here </b>\r\n            <!--\r\n<a href=\"#\" class=\"used\">Used</a>\r\n<a href=\"#\" class=\"loaded\">Loaded</a>\r\n<a href=\"#\" class=\"unloaded\">Unloaded</a>\r\n-->\r\n        </nav>\r\n        <div id=\"filesList\" class=\"list\" span=\"100\"></div>\r\n    </div>\r\n</section>\r\n";
},"useData":true});
templates['panel-history'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"history\">\r\n	<nav>\r\n		<span class=\"title\">History</span>\r\n		<a id=\"btnUndo\" class=\"btn icon fw undo\" title=\"Undo (Ctrl + Z)\"></a>\r\n		<a id=\"btnRedo\" class=\"btn icon fw redo\" title=\"Redo (Ctrl + Shift + Z)\"></a>\r\n	</nav>\r\n	<div id=\"historyList\" class=\"list\"></div>\r\n</section>\r\n";
},"useData":true});
templates['panel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"panel\">\r\n	<div class=\"extend\" data-mousemove-fn=\"panel\"></div>\r\n"
    + ((stack1 = container.invokePartial(partials["panel-history"],depth0,{"name":"panel-history","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["panel-files"],depth0,{"name":"panel-files","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true});
templates['save'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"save\" class=\"border\">\r\n    <button  data-edit=\"save\" type=\"button\" class=\"btn btn-primary save_changes\">Save Changes</button>\r\n\r\n<!--\r\n    <span data-edit=\"save\" class=\"btn2 inshadow icon fw save\" title=\"Save (Ctrl + S)\"></span>\r\n    <h5>Save</h5>\r\n-->\r\n    <input id=\"saveCheckbox\" type=\"checkbox\" />\r\n    <label for=\"saveCheckbox\" mak></label>\r\n    <div class=\"dropdown\">\r\n        <div class=\"title\">Current composition :</div>\r\n        <a href=\"#\" id=\"exportToWaveFile\">Export to Wave file</a>\r\n        <div class=\"title\">All compositions :</div>\r\n        <div class=\"list\"></div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['saveComposition'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"saveComposition\">\r\n	<div class=\"name\"></div>\r\n	<span class=\"bpm\"></span>\r\n	<span class=\"duration\"></span>\r\n</a>\r\n";
},"useData":true});
templates['timeline'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"timeline\">\r\n	<span id=\"currentTimeArrow\" class=\"icon caret-down\"></span>\r\n"
    + ((stack1 = container.invokePartial(partials.timelineLoop,depth0,{"name":"timelineLoop","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div id=\"timelineBeats\"></div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['timelineBeat'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span class=\"timelineBeat\">\r\n	<span></span>\r\n</span>\r\n";
},"useData":true});
templates['timelineLoop'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"timelineLoop\">\r\n	<div class=\"time a\"></div>\r\n	<div class=\"time b\"></div>\r\n</div>\r\n";
},"useData":true});
templates['track'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"track\">\r\n"
    + ((stack1 = container.invokePartial(partials.gsuiToggle,depth0,{"name":"gsuiToggle","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gsuiSpanEditable,depth0,{"name":"gsuiSpanEditable","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true});
templates['visual'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"visual\">\r\n"
    + ((stack1 = container.invokePartial(partials.gsuiOscilloscope,depth0,{"name":"gsuiOscilloscope","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<div class=\"columns\">\r\n		<div class=\"cell-btn\"><a id=\"btnHistory\" class=\"btn2 icon fw history\" title=\"History (undo/redo)\"></a></div>\r\n		<div class=\"cell-btn\"><a id=\"btnFiles\" class=\"btn2 icon fw files\" title=\"Audio files\"></a></div>\r\n		<div class=\"cell-clock\">\r\n"
    + ((stack1 = container.invokePartial(partials.clock,depth0,{"name":"clock","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['_app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.visual,depth0,{"name":"visual","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.menu,depth0,{"name":"menu","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.panel,depth0,{"name":"panel","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.grid,depth0,{"name":"grid","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gsuiPopup,depth0,{"name":"gsuiPopup","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.instantMessenger,depth0,{"name":"instantMessenger","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
})();