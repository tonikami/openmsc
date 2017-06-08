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
    var layer = new Layer({
        blocks: req.body.blocks,
        notes: req.body.notes,
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
