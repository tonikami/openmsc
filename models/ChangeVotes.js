var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var changeVotes = mongoose.Schema({
    user: Schema.Types.ObjectId,
    change: Schema.Types.ObjectId,
    votedUp: Boolean
});

module.exports = mongoose.model('Change_Votes', changeVotes);