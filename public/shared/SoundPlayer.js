var soundPlayer = angular.module("sound.player", ['ngResource', 'ngWebAudio']);

soundPlayer.service("SoundPlayerService", function (WebAudio, $q) {
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
    }

    function calculateDuration() {
        stop = -1;
        for (var i = 0; i < notes.length; i++) {
            var period = notes[i].x + notes[i].length;
            if (period > stop) {
                stop = period;
            }
        }
    }


    function bufferSounds() {
        var soundsBuffering = [];

        for (var i = 0; i < notes.length; i++) {
            soundsBuffering.push(bufferSound(i));
        }

        $q.all(soundsBuffering).then(function () {
            startPlaying();
        });
    }


    function bufferSound(i) {
        var d = $q.defer();
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
        notes[i].audio.onBuffered = function () {
            d.resolve();
        }
        return d.promise;
    }

    function startPlaying() {
        currentBeat = 0;
        interval = setInterval(function () {
            if (paused) {
                pauseBeat(currentBeat);
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
            if (beatIndex <= notes[i].x + notes[i].length) {
                playSound(i);
            }
        }
    }

    function pauseBeat(beatIndex) {
        for (var i = 0; i < notes.length; i++) {
            if (beatIndex <= notes[i].x + notes[i].length) {
                pauseSound(i);
            }
        }
    }

    function playSound(noteIndex) {
        var note = notes[noteIndex];
        note.audio.play();
    }

    function pauseSound(noteIndex) {
        var note = notes[noteIndex];
        note.audio.pause();
    }

    this.pause = function () {
        paused = true;
    }

    this.resume = function () {
        paused = false;
    }

    this.stop = function () {
        console.log('stopped');
        reset();
    }

    function reset() {
        clearInterval(interval);
        pauseBeat(currentBeat);
        paused = false;
        currentBeat = 0;
        soundStoppedCallback();

    }

    this.onCurrentBeatChanged = function (callback) {
        currentBeatChangedCallback = callback;
    }

    this.onStop = function (callback) {
        soundStoppedCallback = callback;
    }

    this.setBPM = function (bpm) {
        beatsPerMinute = bpm;
    }
});
