// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ActivitySchema   = new Schema({
    name:String,
    description:String,
    type:String,
    persons:[{type: Schema.ObjectId, ref: 'person' }],
    personsLists:Array,
    profileimage:String,
    url:String,
    points:Number,
    province: String,
    district: String,
    area: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivitySchema', ActivitySchema);

