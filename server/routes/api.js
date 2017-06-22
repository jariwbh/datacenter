const express = require('express');
const router = express.Router();
var db     = require('../db-config');
var Person     = require('../models/person');
var Admin     = require('../models/admin');
var Formfield     = require('../models/form-field');
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

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


router.route('/formfield/add')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var formfield = new Formfield();      // create a new instance of the Bear model
        formfield.formname = req.body.formname;  // set the bears name (comes from the request)        
        formfield.fieldtype = req.body.fieldtype;
        formfield.lookupdata = req.body.lookupdata;
        formfield.displayname = req.body.displayname;
        formfield.labelname = req.body.labelname;
        formfield.description = req.body.description;
        formfield.isMandatory = req.body.isMandatory;
        formfield.formorder = req.body.formorder;

        // save the formfield and check for errors
        formfield.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'formfield created!' });
        });

    });

router.route('/formfield/:formname')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.formname) {
            Formfield.find({ formname: req.params.formname }, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.route('/admin/login')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {       

            res.json({ message: 'login successful' });        

    });



module.exports = router;
