"use strict";

gs.compositions.saveCurrent = function () {
    gs.compositions.save(gs.compositions.current);
};

gs.compositions.save = function (cmp) {
    save_to_server();

    //    function _save(cmp) {
    //        gs.compositions.current = cmp;
    //        gs.compositions.serialize(cmp);
    //        gs.compositions.store(cmp);
    //        ui.save.selectComposition(cmp);
    //    }

    function save_to_server() {
        var new_samples = gs.composition.samples.filter(function (sample) {
            return sample.meta_data.new == true;
        })
        
        if (new_samples.length == 0) {
            return;
        }
        
        var reqParam = new_samples.map(function (sample) {
            return {
                track: sample.data.track.id,
                file: sample.data.gsfile.id,
                when: ui.BPMem * sample.when,
                slip: ui.BPMem * sample.offset,
                duration: ui.BPMem * sample.duration
            }
        });

        console.log(JSON.stringify(reqParam));

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var response = xmlHttp.responseText;
                location.reload();
            }
        }

        xmlHttp.open("POST", '/api/upload/change', true); // true for asynchronous 
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.send(JSON.stringify(reqParam));
    }
};