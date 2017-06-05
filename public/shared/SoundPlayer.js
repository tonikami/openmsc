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
    var readyToPlay = false;

    /*
       n = [{x, length, path}] where x is the starting position of a sound, length is the block size and path is the path to sound in the public/sound folder 
       t = totalBeats
       b = beatsPerMinute
    */

    this.init = function (n, t, b) {
        readyToPlay = false;
        notes = n;
        totalBeats = t;
        beatsPerMinute = b;

        calculateDuration();
        bufferSounds();
    }

    this.play = function () {
        if (readyToPlay) {
            startPlaying();
        }
    }

    this.addNote = function (n) {
        notes.push(n);
        bufferSound(notes.length - 1);
        calculateDuration();
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
            readyToPlay = true;
        });
    }


    function bufferSound(i) {
        var d = $q.defer();

        // Remove previous wave from ui
        var myEl = angular.element(document.querySelector('#' + notes[i].ui));
        myEl.empty();

        console.log(notes[i].ui);

        var wavesurfer = WaveSurfer.create({
            container: document.getElementById(notes[i].ui),
            waveColor: 'violet',
            height: 60,
            progressColor: 'violet',
            cursorWidth: 0
        });

        wavesurfer.load('/sound/' + notes[i].path);

        wavesurfer.on('ready', function () {
            d.resolve();
        });

        notes[i].audio = wavesurfer;
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
            if (currentBeat > totalBeats || currentBeat > stop) {
                reset();
            }
        }, 60 / beatsPerMinute * 1000);
    }

    function playBeat(beatIndex) {
        currentBeatChangedCallback(beatIndex);
        for (var i = 0; i < notes.length; i++) {
            if (beatIndex == notes[i].x) {
                playSound(i);
            }
        }
    }

    function pauseBeat(beatIndex) {
        for (var i = 0; i < notes.length; i++) {
            if (beatIndex >= notes[i].x && beatIndex <= notes[i].x + notes[i].length) {
                pauseSound(i);
            }
        }
    }

    function playSound(noteIndex) {
        var note = notes[noteIndex];
        var noteDuration = 60 / beatsPerMinute * note.length;
        note.audio.play(0, noteDuration);
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