var express = require('express');
var multer = require('multer');
var gcs = require('multer-gcs');
var router = express.Router();
var ChangeVotes = require('./../models/ChangeVotes');
var Change = require('./../models/Change');
var Sound = require('./../models/Sound');
var Message = require('./../models/Message');
var User = require('./../models/User');
var passportService = require('../config/passport');
var passport = require('passport');
var merge = require('merge');
var async = require('async');

var storage = gcs({
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    },
    bucket: 'openmscsounds', // Required : bucket name to upload 
    projectId: 'flowing-maxim-170100', // Required : Google project ID 
    keyFilename: 'keys/openmsc-3c9cc1f066e2.json', // Required : JSON credentials file for Google Cloud Storage 
    acl: 'publicread' // Optional : Defaults to private 
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // no larger than 50mb, you can change as needed.
    }
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://adib:Tundib95@ds153501.mlab.com:53501/openmsc', {
    server: {
        socketOptions: {
            socketTimeoutMS: 60000,
            connectionTimeout: 60000
        }
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to database');
});

router.get('/user', function (req, res, next) {
    res.json(req.user);
});


router.get('/:changeid/vote/up', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send('Failed');
        return;
    }

    ChangeVotes.findOneAndUpdate({
        user: req.user._id,
        change: req.params.changeid
    }, {
        $set: {
            votedUp: true
        }
    }, {
        upsert: true
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.send("succesfully saved");
    });
});

router.get('/:changeid/vote/down', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send('Failed');
        return;
    }

    ChangeVotes.findOneAndUpdate({
        user: req.user._id,
        change: req.params.changeid
    }, {
        $set: {
            votedUp: false
        }
    }, {
        upsert: true
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        res.send("succesfully saved");
        ChangeVotes.find({
                change: req.params.changeid,
            })
            .exec(function (err, votes) {
                if (err) {
                    return console.error(err);
                }
                var totalVotes = 0;
                for (var i = 0; i < votes.length; i++) {
                    if (votes[i].votedUp == true) {
                        totalVotes++;
                    } else {
                        totalVotes--;
                    }
                }
                console.log(totalVotes);

                if (totalVotes < -2) {
                    Change.findOneAndRemove({
                        _id: req.params.changeid
                    }, function (err) {
                        if (err) next(err);
                    });
                }
            })
    });

});

//router.get('/:changeid/remove/vote', function (req, res, next) {
//    if (!req.isAuthenticated()) {
//        res.send('Failed');
//        return;
//    }
//    
//    LayerVotes.findOneAndRemove({
//        user: req.user._id,
//        layer: req.params.layerid
//    }, function (err) {
//        if (err) next(err);
//        res.send({
//            success: true
//        });
//    });
//});

router.get('/changes', function (req, res, next) {
    Change.find({})
        .populate('creator', 'username')
        .lean()
        .exec(function (err, changes) {
            if (err) {
                return console.error(err);
            }

            var calls = [];
            changes.forEach(function (change) {
                calls.push(function (callback) {
                    addVoteData(change, callback, req);
                });
            })

            async.parallel(calls, function (err) {
                if (err) {
                    return console.log(err);
                }
                res.json(changes);
            });
        })
});

function addVoteData(change, callback, req) {
    ChangeVotes.find({
            change: change._id,
        })
        .exec(function (err, votes) {
            if (err) {
                return console.error(err);
            }
            var totalVotes = 0;
            votes.forEach(function (vote) {
                if (vote.votedUp == true) {
                    totalVotes++;
                } else {
                    totalVotes--;
                }

                if (req.user && vote.user.equals(req.user._id)) {
                    change.votedUp = vote.votedUp;
                };
            })

            change.totalVotes = totalVotes;
            callback(null);
        })
}

router.post('/upload/change', function (req, res, next) {
    var change = new Change({
        blocks: req.body,
        creator: req.user._id
    });

    change.save(function (err, doc) {
        if (err) {
            return console.error(err);
        }

        res.json({
            success: true
        });
    });
});


router.post('/upload/customSound', upload.single('file'), function (req, res, next) {
    var sound = new Sound({
        filename: req.file.filename,
        url: 'https://storage.googleapis.com/openmscsounds/' + req.file.filename,
        created: req.body.created
    });
    sound.save(function (err, new_sound) {
        if (err) {
            return console.error(err);
        }
        res.json(new_sound);
    });
});
router.get('/customSounds', function (req, res, next) {
    Sound.find({})
        .exec(function (err, sounds) {
            if (err) {
                return console.error(err);
            }
            res.json(sounds);
        })
});
router.get('/messages', function (req, res, next) {
    //var finalMessages = [];
    Message.find({})
        .select('message author')
        .sort('-createdAt')
        .limit(30)
        .populate('author')
        .exec(function (err, messages) {
            if (err) {
                console.log(err);
            }
            res.json(messages);
        });
});


router.get('/:message/sendMessage/', function (req, res, next) {
    console.log('creating message');
    var message = new Message({
        message: req.params.message,
        author: req.user._id,
    });
    console.log('message created');
    message.save(function (err, new_message) {
        if (err) {
            res.send({
                error: err
            });
        }
        new_message.populate('author', function (error, final_message) {
            User.find({})
                .exec(function (err, users) {
                    if (err) {
                        return console.error(err);
                    }
                    req.app.io.sockets.in("openmsc").emit('newMessage', final_message);
                })

            res.send(JSON.stringify(final_message));
        });

    });
});

module.exports = router;
