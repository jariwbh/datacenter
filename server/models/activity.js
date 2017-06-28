// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ActivitySchema   = new Schema({
    name:String,
    description:String,
    type:String,
    persons:Array,
    profileimage:String,
    url:String,
    points:Number
});

module.exports = mongoose.model('ActivitySchema', ActivitySchema);

