var express = require('express');
var multer = require('multer');
var router = express.Router();
var Layer = require('./../models/layer');
var LayerVotes = require('./../models/LayerVotes');
var passportService = require('../config/passport');
var passport = require('passport');
var merge = require('merge');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/sound');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

var upload = multer({
    storage: storage,

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

router.get('/layers', function (req, res, next) {
    Layer.find({})
        .populate([{
            path: 'creator',
            select: "username"
            }])
        .exec(function (err, layers) {
            if (err) {
                return console.error(err);
            }

            res.json(layers);
        })
});

router.post('/upload/layer', function (req, res, next) {
    var notes = [];
    for (var i = 0; i < req.body.notes.length; i++) {
        var note = {
            start: req.body.notes[i].col,
            duration: req.body.notes[i].sizeX,
            path: req.body.notes[i].path,
            color: req.body.notes[i].color,
        }
        notes.push(note);
    }

    var layer = new Layer({
        notes: notes,
        votes: 0,
        creator: req.user._id
    });

    layer.save(function (err, new_layer) {
        if (err) {
            return console.error(err);
        }
        res.json(new_layer);
    });
});

router.post('/upload/customSound', upload.single('file'), function (req, res, next) {
    res.json(req.file.filename);
});

module.exports = router;