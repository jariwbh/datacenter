// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AuditSchema   = new Schema({
    activity: String,
    adminid:String,
    date: String   
});

module.exports = mongoose.model('Audit', AuditSchema);

