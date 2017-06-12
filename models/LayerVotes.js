var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var layerVotes = mongoose.Schema({
    user: Schema.Types.ObjectId,
    layer: Schema.Types.ObjectId,
    votedUp: Boolean
});

module.exports = mongoose.model('Layer_Votes', layerVotes);