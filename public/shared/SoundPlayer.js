var soundPlayer = angular.module("sound.player", ['ngResource', 'ngWebAudio']);

soundPlayer.service("SoundPlayerService", function (WebAudio) {
    var notes;
    var totalBeats;
    var beatsPerMinute;
    var currentBeat = 0;
    var currentBeatChangedCallback;
    var soundStoppedCallback;
    var stop;
    var paused = false;
    var interval;

    /*
       n = [{x, length, path}] where x is the starting position of a sound, length is the block size and path is the path to sound in the public/sound folder 
       t = totalBeats
       b = beatsPerMinute
    */

    this.play = function (n, t, b) {
        notes = n;
        totalBeats = t;
        beatsPerMinute = b;

        calculateDuration();
        bufferSounds();
        startPlaying();
    }

    function calculateDuration() {
        var max_x = 0;
        var max_index = -1;
        console.log(notes);
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].x > max_x) {
                max_x = notes[i].x;
                max_index = i;
            }
        }

        stop = max_x + notes[max_index].length;
        console.log(stop);
    }


    function bufferSounds() {
        for (var i = 0; i < notes.length; i++) {
            var noteDuration = 60 / beatsPerMinute * notes[i].length;
            var options = {
                buffer: true,
                loop: false,
                duration: noteDuration,
                gain: 1,
                fallback: false, // Use HTML5 audio fallback
                retryInterval: 1000 // Retry interval if buffering fails
            }
            notes[i].audio = WebAudio('/sound/' + notes[i].path, options);
        }
    }

    function startPlaying() {
        currentBeat = 0;
        interval = setInterval(function () {
            if (paused) {
                return;
            }

            playBeat(currentBeat);
            currentBeat++;
            if (currentBeat >= totalBeats || currentBeat >= stop) {
                reset();
            }
        }, 60 / beatsPerMinute * 1000);
    }

    function playBeat(beatIndex) {
        currentBeatChangedCallback(beatIndex);
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].x == beatIndex) {
                playSound(i);
            }
        }
    }

    function playSound(noteIndex) {
        var note = notes[noteIndex];
        note.audio.play();
    }

    this.pause = function () {
        paused = true;
    }

    this.resume = function () {
        paused = false;
    }

    this.stop = function () {
        reset();
    }

    function reset() {
        currentBeat = 0;
        paused = false;
        clearInterval(interval);
        soundStoppedCallback();

    }

    this.onCurrentBeatChanged = function (callback) {
        currentBeatChangedCallback = callback;
    }

    this.onStop = function (callback) {
        soundStoppedCallback = callback;
    }
});