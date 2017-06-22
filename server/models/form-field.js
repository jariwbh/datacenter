// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FormfieldSchema   = new Schema({
    formname: String,
    fieldtype: String,
    lookupdata: String,
    displayname: String,
    labelname: String,
    description: String,
    isMandatory: Boolean,
    formorder: Number,
    issystemfield: Boolean
});

module.exports = mongoose.model('Formfield', FormfieldSchema);

