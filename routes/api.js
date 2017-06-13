var express = require('express');
var multer = require('multer');
var gcs = require('multer-gcs');
var router = express.Router();
var Block = require('./../models/Block');
var LayerVotes = require('./../models/LayerVotes');
var Change = require('./../models/Change');
var Sound = require('./../models/Sound');
var Message = require('./../models/Message');
var User = require('./../models/User');
var passportService = require('../config/passport');
var passport = require('passport');
var merge = require('merge');

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
mongoose.connect('mongodb://adib:Tundib95@ds153501.mlab.com:53501/openmsc');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to database');
});

router.get('/user', function (req, res, next) {
    res.json(req.user);
});


router.get('/:layerid/vote/increment', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send('Failed');
        return;
    }

    LayerVotes.findOneAndUpdate({
        user: req.user._id,
        layer: req.params.layerid
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

router.get('/:layerid/vote/decrement', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send('Failed');
        return;
    }
    LayerVotes.findOneAndUpdate({
        user: req.user._id,
        layer: req.params.layerid
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
        return res.send("succesfully saved");
    });


    LayerVotes.find({
            layer: req.params.layerid,
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
                Layer.findOneAndRemove({
                    _id: req.params.layerid
                }, function (err) {
                    if (err) next(err);
                });
            }
        })
});


router.get('/:layerid/remove/vote', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send('Failed');
        return;
    }

    LayerVotes.findOneAndRemove({
        user: req.user._id,
        layer: req.params.layerid
    }, function (err) {
        if (err) next(err);
        res.send({
            success: true
        });
    });
});

router.get('/:layerid/myVote', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send('Failed');
        return;
    }

    LayerVotes.findOne({
            layer: req.params.layerid,
            user: req.user._id
        })
        .exec(function (err, vote) {
            if (err) {
                return console.error(err);
            }

            if (vote) {
                res.json(vote);
            } else {
                res.send({
                    votedUp: null
                });
            }

        })
});

router.get('/:layerid/totalVotes', function (req, res, next) {
    LayerVotes.find({
            layer: req.params.layerid,
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

            res.send({
                totalVotes: totalVotes
            });
        })
});

router.get('/blocks', function (req, res, next) {
    Block.find({})
        .exec(function (err, blocks) {
            if (err) {
                return console.error(err);
            }

            res.json(blocks);
        })
});

router.get('/changes', function (req, res, next) {
    Change.find({})
        .exec(function (err, changes) {
            if (err) {
                return console.error(err);
            }

            res.json(changes);
        })
});

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

router.post('/upload/layer', function (req, res, next) {
    console.log(req.body);
    for (var i = 0; i < req.body.length; i++) {
        var block = new Block({
            track: req.body[i].track,
            file: req.body[i].file,
            duration: req.body[i].duration,
            when: req.body[i].when,
            offset: req.body[i].offset,
            slip: req.body[i].slip,
        });

        block.save(function (err, doc) {
            if (err) {
                return console.error(err);
            }
        });
    }

    res.json({
        success: true
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
    Message.find({})
        .select('createdAt message author')
        .sort('createdAt')
        .populate('author')
        .exec(function (err, messages) {
            if (err) {
                res.send({
                    error: err
                });
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
