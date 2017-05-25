var mongoose = require('mongoose');

var layerSchema = mongoose.Schema({
    blocks: [String],
    notes: [String],
    votes: Number
});

module.exports = mongoose.model('Layer', layerSchema);
