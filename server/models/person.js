// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
    personid:Number,
    person: Object,
    createdAt: { type: Date, default: Date.now }     
});

module.exports = mongoose.model('Person', PersonSchema);

