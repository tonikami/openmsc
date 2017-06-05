var musicCollab = angular.module('musicCollab', ['ngMaterial', 'ngMdIcons', 'ngResource', 'gridster', 'sound.player', 'ngWebAudio', 'angularFileUpload', 'registraton']);

musicCollab.factory("Increment_Vote", function ($resource) {
    return $resource('/api/:layerid/vote/increment', {
        layerid: '@layerid'
    });
});

musicCollab.factory("Decrement_Vote", function ($resource) {
    return $resource('/api/:layerid/vote/decrement', {
        layerid: '@layerid'
    });
});

musicCollab.factory("Layers", function ($resource) {
    return $resource('/api/layers')
});

musicCollab.factory("Upload_Layer", function ($resource) {
    return $resource('/api/upload/layer')
});


musicCollab.factory("My_Vote", function ($resource) {
    return $resource('/api/:layerid/myVote', {
        layerid: '@layerid'
    });
});

musicCollab.factory("Remove_Vote", function ($resource) {
    return $resource('/api/:layerid/remove/vote', {
        layerid: '@layerid'
    });
});

musicCollab.factory("Total_Votes", function ($resource) {
    return $resource('/api/:layerid/totalVotes', {
        layerid: '@layerid'
    });
});

musicCollab.controller('AppCtrl', function ($scope, $mdDialog, $q, $mdToast, Increment_Vote, Decrement_Vote, Layers, Upload_Layer, SoundPlayerService, WebAudio, Login, Signup, User, My_Vote, Total_Votes, Remove_Vote, $window) {
    $scope.isPlaying = false;
    $scope.paused = false;
    $scope.editable = true;
    $scope.splitFactor = 400;
    $scope.bpm = 300;
    $scope.vol = 1;
    $scope.justAdded = false;
    $scope.layers = [];
    $scope.currentLayer = null;
    $scope.topBlocks = [];

    $scope.beatsPerMin = {
        val: $scope.bpm,
    }

    $scope.init = function () {
        Layers.query(function (response) {
            for (var i = 0; i < response.length; i++) {
                for (var j = 0; j < response[i].notes.length; j++) {
                    response[i].notes[j].sizeX = response[i].notes[j].duration;
                    response[i].notes[j].col = response[i].notes[j].start;
                    response[i].notes[j].row = 1;
                    response[i].notes[j].sizeY = 1;
                }
            }

            $scope.layers = response;

            for (var i = 0; i < response.length; i++) {
                initVotedUp(i);
                initTotalVotes(i);
            }
        });


        for (var i = 0; i < $scope.splitFactor; i++) {
            $scope.topBlocks.push({
                color: "red"
            });
        }
    }

    function initVotedUp(i) {
        My_Vote.get({
            layerid: $scope.layers[i]._id
        }, function (response) {
            $scope.layers[i].votedUp = response.votedUp;
        });
    }

    function initTotalVotes(i) {
        Total_Votes.get({
            layerid: $scope.layers[i]._id
        }, function (response) {
            $scope.layers[i].votes = response.totalVotes;
        });
    }

    $scope.init();

    $scope.updateBPM = function () {
        $scope.bpm = $scope.beatsPerMin.val;
        SoundPlayerService.setBPM($scope.bpm);
    }





    $scope.playFunction = function () {
        if (!$scope.isPlaying) {
            $scope.playAudio();
            $scope.isPlaying = true;
        } else {
            $scope.resumeAudio();
        }
    }

    $scope.playAudio = function () {
        var totalNotes = [];
        for (var i = 0; i < $scope.layers.length; i++) {
            totalNotes = totalNotes.concat($scope.layers[i].notes);
        }

        if ($scope.currentLayer) {
            totalNotes = totalNotes.concat($scope.currentLayer.notes);
        }
        for (var i = 0; i < totalNotes.length; i++) {
            totalNotes[i].x = totalNotes[i].col;
            totalNotes[i].length = totalNotes[i].sizeX;
        }
        SoundPlayerService.play(totalNotes, $scope.splitFactor, $scope.bpm);
        SoundPlayerService.onCurrentBeatChanged(function (beatIndex) {
            for (var i = 0; i < $scope.topBlocks.length; i++) {
                if (i == beatIndex) {
                    $scope.topBlocks[i].color = "blue"
                }
            }

            $scope.currentBeatIndex = beatIndex;
            $scope.$apply();
        });


        SoundPlayerService.onStop(function () {
            $scope.topBlocks = [];
            $scope.isPlaying = false;
            $scope.paused = false;
            for (var i = 0; i < $scope.splitFactor; i++) {
                $scope.topBlocks.push({
                    color: "red"
                });
            }
            $scope.$apply();
        });
    }

    $scope.pauseAudio = function () {
        $scope.paused = true;
        SoundPlayerService.pause();
    }

    $scope.resumeAudio = function () {
        $scope.paused = false;
        SoundPlayerService.resume();
    }

    $scope.stopAudio = function () {
        $scope.pauseAudio();
        $scope.isPlaying = false;
        $scope.paused = false;
        SoundPlayerService.stop();
    }

    $scope.gridsterOpts = {
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 1,
        columns: $scope.splitFactor, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: '60', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [1, 1], // the pixel distance between each widget
        defaultSizeX: 1, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint: 1, // if the screen is not wider that this, remove the grid layout and stack the items
        pushing: false,
        swapping: false,
        resizable: {
            enabled: true,
            start: function (event, uiWidget, $element) {}, // optional callback fired when resize is started,
            resize: function (event, uiWidget, $element) {}, // optional callback fired when item is resized,
            stop: function (event, uiWidget, $element) {
                    $scope.editable = false;
                } // optional callback fired when item is finished resizing
        },
        draggable: {
            enabled: true, // whether dragging items is supported
            handle: '.ddd', // optional selector for resize handle
            start: function (event, uiWidget, $element) {}, // optional callback fired when drag is started,
            drag: function (event, uiWidget, $element) {}, // optional callback fired when item is moved,
            stop: function (event, uiWidget, $element) {
                    $scope.editable = false;
                } // optional callback fired when item is finished dragging
        }
    };

    $scope.gridsterOptsLayer = {
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 1,
        columns: $scope.splitFactor, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: '60', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [1, 1], // the pixel distance between each widget
        defaultSizeX: 1, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint: 1, // if the screen is not wider that this, remove the grid layout and stack the items
        resizable: {
            enabled: false,
            start: function (event, uiWidget, $element) {}, // optional callback fired when resize is started,
            resize: function (event, uiWidget, $element) {}, // optional callback fired when item is resized,
            stop: function (event, uiWidget, $element) {
                    $scope.editable = false;
                } // optional callback fired when item is finished resizing
        },
        draggable: {
            enabled: false, // whether dragging items is supported
            handle: '.ddd', // optional selector for resize handle
            start: function (event, uiWidget, $element) {}, // optional callback fired when drag is started,
            drag: function (event, uiWidget, $element) {}, // optional callback fired when item is moved,
            stop: function (event, uiWidget, $element) {
                    $scope.editable = false;
                } // optional callback fired when item is finished dragging
        }
    };

    $scope.gridsterOptsCurrentBlocks = {
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 1,
        columns: $scope.splitFactor, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: '25', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [1, 1], // the pixel distance between each widget
        defaultSizeX: 1, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint: 1, // if the screen is not wider that this, remove the grid layout and stack the items
        resizable: {
            enabled: false,
            start: function (event, uiWidget, $element) {}, // optional callback fired when resize is started,
            resize: function (event, uiWidget, $element) {}, // optional callback fired when item is resized,
            stop: function (event, uiWidget, $element) {
                    $scope.editable = false;
                } // optional callback fired when item is finished resizing
        },
        draggable: {
            enabled: false, // whether dragging items is supported
            handle: '.ddd', // optional selector for resize handle
            start: function (event, uiWidget, $element) {}, // optional callback fired when drag is started,
            drag: function (event, uiWidget, $element) {}, // optional callback fired when item is moved,
            stop: function (event, uiWidget, $element) {
                    $scope.editable = false;
                } // optional callback fired when item is finished dragging
        }
    };

    $scope.increaseSplitFactor = function () {
        if ($scope.splitFactor != 5) {
            $scope.splitFactor++;
            $scope.updateGrid();
        }
    }
    $scope.decreaseSplitFactor = function () {
        if ($scope.splitFactor != 1) {
            $scope.splitFactor--;
            $scope.updateGrid();
        }
    }


    $scope.submitLayer = function () {
        //$scope.layers.push($scope.currentLayer);
        $scope.justAdded = false;
        Upload_Layer.save({}, {
            notes: $scope.currentLayer.notes,
        }).$promise.then(function () {
            $mdToast.show(
                $mdToast.simple()
                .textContent("Succesfully Added")
                .position("bottom")
                .hideDelay(3000)
            );
            $window.location.reload();

        });
    }
    $scope.addLayer = function () {
        $scope.currentLayer = {
            notes: [],
            votedUp: null,
        };
        $scope.justAdded = true;
    };

    $scope.voteUp = function (index) {
        if ($scope.layers[index].votedUp == null) {
            $scope.layers[index].votes++;
            Increment_Vote.get({
                layerid: $scope.layers[index]._id
            });
            $scope.layers[index].votedUp = true;
        } else if (!$scope.layers[index].votedUp) {
            $scope.layers[index].votes++;
            $scope.layers[index].votes++;
            Increment_Vote.get({
                layerid: $scope.layers[index]._id
            });
            $scope.layers[index].votedUp = true;
        } else if ($scope.layers[index].votedUp) {
            $scope.layers[index].votes--;
            $scope.layers[index].votedUp = null;
            Remove_Vote.get({
                layerid: $scope.layers[index]._id
            });
        }
    }

    $scope.voteDown = function (index) {
        if ($scope.layers[index].votedUp == null) {
            $scope.layers[index].votes--;
            Decrement_Vote.get({
                layerid: $scope.layers[index]._id
            });
            $scope.layers[index].votedUp = false;
        } else if ($scope.layers[index].votedUp) {
            $scope.layers[index].votes--;
            $scope.layers[index].votes--;
            Decrement_Vote.get({
                layerid: $scope.layers[index]._id
            });
            $scope.layers[index].votedUp = false;
        } else if (!$scope.layers[index].votedUp) {
            $scope.layers[index].votes++;
            $scope.layers[index].votedUp = null;
            Remove_Vote.get({
                layerid: $scope.layers[index]._id
            });
        }
    }

    $scope.addBlock = function (ev) {
        $scope.showTabDialog(ev, -1);
    }

    $scope.endPositionCurrLayer = function () {
        if ($scope.currentLayer.notes.length == 0) {
            return 0;
        }
        var furthestStart = -1;
        var furthestStartIndex = -1;
        for (var i = 0; i < $scope.currentLayer.notes.length; i++) {
            var currStart = $scope.currentLayer.notes[i].start;
            if (currStart > furthestStart) {
                furthestStart = currStart;
                furthestStartIndex = i;
            }
        }
        var start = $scope.currentLayer.notes[furthestStartIndex].start + $scope.currentLayer.notes[furthestStartIndex].duration;
        return start;
    }

    $scope.showTabDialog = function (ev, index) {
        if ($scope.editable) {
            $mdDialog.show({
                    controller: editBlockController,
                    locals: {
                        currentLayer: $scope.currentLayer,
                        index: index
                    },
                    templateUrl: '/html/editBlock.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                })
                .then(function (response) {
                    if (index != -1) {
                        $scope.currentLayer.notes[index].color = response.color;
                        $scope.currentLayer.notes[index].path = response.notesName;
                    } else {
                        notes = {
                            sizeX: 1,
                            path: response.notesName,
                            color: response.color
                        };
                        $scope.currentLayer.notes.push(notes);
                    }
                });
        } else {
            $scope.editable = true;
        }
    }
});




<!-- Controller for edit block popup -->
function editBlockController($scope, $mdDialog, currentLayer, index, WebAudio, FileUploader) {
    $scope.currentLayer = currentLayer;
    $scope.index = index;
    $scope.color;
    $scope.notesName;
    $scope.customSound = new Audio();

    $scope.init = function () {
        if ($scope.index != -1) {
            $scope.color = $scope.currentLayer.notes[$scope.index].color;
            $scope.notesName = $scope.currentLayer.notes[$scope.index].path;
        }
    }
    $scope.init();

    $scope.soundUploader = new FileUploader({
        url: 'api/upload/customSound',
        autoUpload: true,
    });

    $scope.soundUploader.filters.push({
        name: 'soundFilter',
        fn: function (item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|wav|mp3|'.indexOf(type) !== -1;
        }
    });

    $scope.soundUploader.onSuccessItem = function (item, response, status, headers) {
        $scope.notesName = response;
    }

    $scope.select = function (color, notesName) {
        if (color != 'brown') {
            $scope.color = color;
            $scope.notesName = notesName;
            $scope.getAudio(notesName).play();
            $scope.customSound = new Audio();
        } else {
            var file = document.getElementById('soundFile');
            file.onchange = function (e) {
                if (file.files[0]) {
                    var ext = this.value.match(/\.([^\.]+)$/)[1];
                    switch (ext) {
                    case 'wav':
                    case 'mp3':
                        var reader = new FileReader();
                        reader.onload = function () {
                            $scope.customSound.src = reader.result;
                            $scope.notesName = file.files[0].name;
                            $scope.color = color;
                            $scope.customSound.play();
                        }
                        reader.readAsDataURL(file.files[0]);
                        break;
                    default:
                        alert('Invalid File Type');
                        $scope.customSound.src = new Audio();
                    }
                }
            };
            if ($scope.customSound.src != '') {
                $scope.customSound.play();
            }
        }
    };

    $scope.delete = function () {
        if ($scope.currentLayer.notes[$scope.index]) {
            $scope.currentLayer.notes.splice($scope.index, 1);
            $mdDialog.cancel();
        }
    };

    $scope.cancel = function () {
        if ($scope.customSound) {
            $scope.customSound.pause();
        }
        $mdDialog.cancel();
    };

    $scope.save = function () {
        if ($scope.customSound) {
            $scope.customSound.pause();
        }
        if ($scope.color) {
            $mdDialog.hide({
                color: $scope.color,
                notesName: $scope.notesName,
            });
        }
    };

    $scope.getAudio = function (notesName) {
        var sound;
        if ($scope.notesName == 'c.wav') {
            sound = WebAudio('sound/c.wav');
        } else if ($scope.notesName == 'cs.wav') {
            sound = WebAudio('sound/cs.wav');
        } else if ($scope.notesName == 'd.wav') {
            sound = WebAudio('sound/d.wav');
        } else if ($scope.notesName == 'eb.wav') {
            sound = WebAudio('sound/eb.wav');
        } else if ($scope.notesName == 'e.wav') {
            sound = WebAudio('sound/e.wav');
        } else if ($scope.notesName == 'f.wav') {
            sound = WebAudio('sound/f.wav');
        } else if ($scope.notesName == 'fs.wav') {
            sound = WebAudio('sound/fs.wav');
        } else if ($scope.notesName == 'g.wav') {
            sound = WebAudio('sound/g.wav');
        } else if ($scope.notesName == 'gs.wav') {
            sound = WebAudio('sound/gs.wav');
        } else if ($scope.notesName == 'a.wav') {
            sound = WebAudio('sound/a.wav');
        } else if ($scope.notesName == 'bb.wav') {
            sound = WebAudio('sound/bb.wav');
        } else if ($scope.notesName == 'b.wav') {
            sound = WebAudio('sound/b.wav');
        } else if ($scope.notesName == 'bell.wav') {
            sound = WebAudio('sound/bell.wav');
        } else if ($scope.notesName == 'hightom.wav') {
            sound = WebAudio('sound/hightom.wav');
        } else if ($scope.notesName == 'middlecrash.wav') {
            sound = WebAudio('sound/middlecrash.wav');
        } else if ($scope.notesName == 'snaredrum.wav') {
            sound = WebAudio('sound/snaredrum.wav');
        }
        return sound;
    }
};