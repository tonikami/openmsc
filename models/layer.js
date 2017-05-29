var mongoose = require('mongoose');

var layerSchema = mongoose.Schema({
    notes: [{
        start: Number,
        duration: Number,
        path: String,
        color: String
    }],
    votes: Number
});

module.exports = mongoose.model('Layer', layerSchema);
