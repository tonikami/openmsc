"use strict";

gs.numberKeys.press = function (e) {
    if (gs.composition.isPlaying) {
        if (gs.numberKeys.keys[e.keys[0]].file != null && gs.numberKeys.keys[e.keys[0]].track != null) {
            gs.history.pushExec("create", {
                sample: gs.sample.create(gs.files[gs.numberKeys.keys[e.keys[0]].file]),
                track: waFwk.tracks[gs.numberKeys.keys[e.keys[0]].track].userData,
                when: gs.currentTime()
            });
        }
    } else {
        if (document.activeElement) {
            var sel = document.activeElement;
            sel.value = sel.value + e.keys[0];
        }
    }
}
