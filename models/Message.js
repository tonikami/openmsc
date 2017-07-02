var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = mongoose.Schema({
    message: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Message', MessageSchema);
