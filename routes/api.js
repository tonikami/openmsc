var express = require('express');
var router = express.Router();
var Layer = require('./../models/layer');

var mongoose = require('mongoose');
mongoose.connect('mongodb://adib:Tundib95@ds153501.mlab.com:53501/openmsc');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to database');
});


router.get('/:layerid/vote/increment', function (req, res, next) {
    Layer.findById(req.params.layerid, function (err, layer) {
        if (!layer) {
            return;
        }
        layer.votes++;
        layer.save(function (err, new_layer) {
            if (err) {
                return console.error(err);
            }
            res.json(new_layer);
        });
    });
});

router.get('/:layerid/vote/decrement', function (req, res, next) {
    Layer.findById(req.params.layerid, function (err, layer) {
        if (!layer) {
            return;
        }

        layer.votes--;
        if (layer.votes <= -2) {
            layer.remove(function () {
                res.send("Removed Layer");
            });
        } else {
            layer.save(function (err, new_layer) {
                if (err) {
                    return console.error(err);
                }
                res.json(new_layer);
            });
        }
    });
});

router.get('/layers', function (req, res, next) {
    Layer.find(function (err, layers) {
        if (err) {
            return console.error(err);
        }

        res.json(layers);
    })
});

router.post('/upload/layer', function (req, res, next) {
    console.log(req.body);
    var notes = [];
    for (var i = 0; i < req.body.notes.length; i++) {
        var note = {
            start: req.body.notes[i].col,
            duration: req.body.notes[i].sizeX,
            path: req.body.notes[i].path,
            color: req.body.notes[i].color
        }
        notes.push(note);
    }

    var layer = new Layer({
        notes: notes,
        votes: 0
    });
    layer.save(function (err, new_layer) {
        if (err) {
            return console.error(err);
        }
        res.json(new_layer);
    });
});

module.exports = router;
