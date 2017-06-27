// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FormfieldSchema   = new Schema({
    formname: String,
    fieldtype: String,
    lookupdata: Array,
    displayname: String,
    labelname: String,
    description: String,
    isMandatory: Boolean,
    isDisplayOnList: Boolean,
    formorder: Number,
    issystemfield: Boolean
});

module.exports = mongoose.model('Formfield', FormfieldSchema);

