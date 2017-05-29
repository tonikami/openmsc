var soundPlayer = angular.module("sound.player", ['ngResource', 'ngWebAudio']);

soundPlayer.service("SoundPlayerService", function (WebAudio) {
    var notes;
    var totalBeats;
    var beatsPerMinute;
    var currentBeat = 0;
    
    /*
       n = [{x, length, path}] where x is the starting position of a sound, length is the block size and path is the path to sound in the public/sound folder 
       t = totalBeats
       b = beatsPerMinute
    */

    this.play = function (n, t, b) {
        notes = n;
        totalBeats = t;
        beatsPerMinute = b;

        startPlaying();
    }

    function startPlaying() {
        currentBeat = 0;
        var interval = setInterval(function () {
            playBeat(currentBeat);
            currentBeat++;
            if (currentBeat >= totalBeats) {
                clearInterval(interval);
            }
        }, 60 / beatsPerMinute * 1000);
    }

    function playBeat(beatIndex) {
        console.log("Playing Beat: " + beatIndex);

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].x == beatIndex) {
                playSound(i);
            }
        }
    }

    function playSound(noteIndex) {
        console.log("Playing Sound: " + noteIndex);
        var note = notes[noteIndex];
        var noteDuration = 60 / beatsPerMinute * note.length;

        var options = {
            buffer: true,
            loop: false,
            duration: noteDuration,
            gain: 1,
            fallback: false, // Use HTML5 audio fallback
            retryInterval: 1000 // Retry interval if buffering fails
        }

        var sound = WebAudio('/sound/' + note.path, options);

        sound.play();
    }
});