// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AdminPointHistorySchema   = new Schema({
    adminid: {type: mongoose.Schema.Types.ObjectId, ref: 'admin'},
    point: Number,
    activity: String,
    date: Date
});

module.exports = mongoose.model('AdminPointHistory', AdminPointHistorySchema);

