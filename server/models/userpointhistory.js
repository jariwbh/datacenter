// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonPointHistorySchema   = new Schema({
    personid: {type: mongoose.Schema.Types.ObjectId, ref: 'person'},
    point: Number,
    activity: String,
    date: Date
});

module.exports = mongoose.model('PersonPointHistory', PersonPointHistorySchema);

