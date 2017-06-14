"use strict";

gs.numberKeys.assign = function(key, file, track) {
    gs.numberKeys.keys[key] = {
        file: file,
        track: track
    }
}
