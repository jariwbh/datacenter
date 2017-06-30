// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SettingSchema   = new Schema({
    noOfUserInProvince: Array,
    noOfUserInArea: Array,
    noOfUserInDistrict: Array,
    noOfUserInSocial: Array,
    noOfUsers: Number,
    websiteTitle: String
});

module.exports = mongoose.model('Setting', SettingSchema);

