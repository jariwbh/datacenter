// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AdminSchema   = new Schema({
    admin:Object,
    username: String,
    password: String,
    points:Number
});

module.exports = mongoose.model('Admin', AdminSchema);