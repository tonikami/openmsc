var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var layerSchema = mongoose.Schema({
    notes: [{
        start: Number,
        duration: Number,
        path: String,
        color: String,
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user_votes: {
        type: [{
            user: Schema.Types.ObjectId,
            votedUp: Boolean
    }],
        default: []
    },
    votes: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Layer', layerSchema);