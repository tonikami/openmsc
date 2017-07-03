var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockSchema = mongoose.Schema({
    projectid: Number,
    duration: Number,
    when: Number,
    slip: Number,
    track: Number,
    file: Number,
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

module.exports = mongoose.model('Blocks', blockSchema);