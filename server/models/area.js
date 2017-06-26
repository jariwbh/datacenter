// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AreaSchema   = new Schema({
    province: String,
    area: String   
});

module.exports = mongoose.model('Area', AreaSchema);

