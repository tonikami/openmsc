var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var changeSchema = mongoose.Schema({
    blocks: [{
        duration: Number,
        when: Number,
        slip: Number,
        track: Number,
        file: Number
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
    }
});

module.exports = mongoose.model('Changes', changeSchema);