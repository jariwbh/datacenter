// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SettingSchema   = new Schema({
    noOfUserInProvince: Array,
    noOfUserInArea: Array,
    noOfUserInDistrict: Array,
    noOfUserInSocial: Array,
    noOfUsers: Number,
    addPersonPointsAdmin: Number,    
    addPointPointsAdmin: Number,    
    addActivityPointsAdmin: Number,    
    addhashtagPoints: Number,
    addfacebookPoints: Number,
    addtelegramPoints: Number,
    addOtherPoints: Number,
    websiteTitle: String
});

module.exports = mongoose.model('Setting', SettingSchema);

