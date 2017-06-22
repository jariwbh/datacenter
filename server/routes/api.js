const express = require('express');
const router = express.Router();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userdb'); // connect to our database
var Bear     = require('../models/bear');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = "Bharat bear";  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    });


module.exports = router;
