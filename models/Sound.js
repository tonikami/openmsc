var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SoundSchema = mongoose.Schema({
    filename: String,
    url: String,
    created: Number
});

module.exports = mongoose.model('Sound', SoundSchema);
