var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = mongoose.Schema({
    message: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: Number
});

module.exports = mongoose.model('Message', MessageSchema);
