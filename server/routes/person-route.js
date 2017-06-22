const router = express.Router();
var db     = require('../db-config');
var Person     = require('../models/person');

/* GET api listing. */

router.route('/person')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var person = new Person();      // create a new instance of the Bear model
        person.name = "Bharat bear";  // set the bears name (comes from the request)

        // save the bear and check for errors
        person.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'person created!' });
        });

    });


module.exports = router;
