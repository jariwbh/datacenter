// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ActivitySchema   = new Schema({
    name:String,
    description:String,
    activitytype:String,
    persons:[{type: Schema.ObjectId, ref: 'person' }],    
    image:String,
    url:String,    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);

