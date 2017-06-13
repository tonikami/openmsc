var express = require('express');
var multer = require('multer');
var router = express.Router();
var Block = require('./../models/Block');
var LayerVotes = require('./../models/LayerVotes');
var passportService = require('../config/passport');
var passport = require('passport');
var merge = require('merge');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/sound');
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage

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

router.get('/:layerid/projectname', function (req, res, next) {
    projectid.find({
        projectid: req.params.layerid,
    })
        .exec(function(err, projectid) {
        if (err) {
            return console.error(err);
        }
        var projectname = 0;
        for (var i = 0, i < projectid.length; i++){
            projectname=projectid+1;
        }
        res.send(projectname);
    })
    
})

router.get('/blocks', function (req, res, next) {
    Block.find({})
        .exec(function (err, blocks) {
            if (err) {
                return console.error(err);
            }

            res.json(blocks);
        })
});

router.post('/upload/layer', function (req, res, next) {
    console.log(req.body);
    for (var i = 0; i < req.body.length; i++) {
        var block = new Block({
            projectid: req.body[i].projectid,
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
    res.send("File Successfully added");
});

router.get('/customSounds', function (req, res, next) {
    filesList = [];
    var fs = require('fs');
    var files = fs.readdirSync('public/sound');
    res.send(JSON.stringify(files));
});

module.exports = router;
