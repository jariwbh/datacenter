// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
    person: Object    
});

module.exports = mongoose.model('Person', PersonSchema);

