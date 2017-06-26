// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DistrictSchema   = new Schema({
    province: String,
    district: String   
});

module.exports = mongoose.model('District', DistrictSchema);

