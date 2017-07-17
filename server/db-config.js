var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dbuser:pass#123@ds157342.mlab.com:57342/heroku_4p9ggb81'); 
//mongoose.connect('mongodb://localhost:27017/datacenter');