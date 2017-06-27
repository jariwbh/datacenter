const express = require('express');
const router = express.Router();
var db     = require('../db-config');
var Person     = require('../models/person');
var Area     = require('../models/area');
var Province     = require('../models/province');
var District     = require('../models/district');
var Setting     = require('../models/setting');
var Admin     = require('../models/admin');
var Formfield     = require('../models/form-field');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app = express();
app.set('superSecret',"datacenter");

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


router.route('/lookup/area')
    
    .get(function(req, res) {        
        console.log("Api called");
        Area.find(function (err, docs) {            
            console.log(docs);
            res.json(docs);
        });

    });


router.route('/lookup/province')
    
    .get(function(req, res) {                
        Province.find(function (err, docs) {                    
            res.json(docs);
        });

    });

router.route('/lookup/district')
    
    .get(function(req, res) {                
        District.find(function (err, docs) {                    
            res.json(docs);
        });

    });

router.route('/setting')
    
    .get(function(req, res) {                
        Setting.findOne(function (err, docs) {              
            res.json(docs);
        });

    });

router.route('/setting')
    // create a person 
    .post(function(req, res) {
          console.log();
        var setting = new Setting();      // create a new instance of the Bear model
        setting.noOfUserInCity = req.body.noOfUserInCity;  // set the bears name (comes from the request)
        setting.noOfUserInDistrict = req.body.noOfUserInDistrict;  // set the bears name (comes from the request)
        setting.noOfUserInSocial = req.body.noOfUserInSocial;  // set the bears name (comes from the request)
        setting.noOfUsers = req.body.noOfUsers;  // set the bears name (comes from the request)
        setting.websiteTitle = req.body.websiteTitle;  // set the bears name (comes from the request)

        // save the person and check for errors
        Setting.findOne(function (err, out) {

            if (out!=null)
            {
                out.noOfUserInCity = req.body.noOfUserInCity;  // set the bears name (comes from the request)
                out.noOfUserInDistrict = req.body.noOfUserInDistrict;  // set the bears name (comes from the request)
                out.noOfUserInSocial = req.body.noOfUserInSocial;  // set the bears name (comes from the request)
                out.noOfUsers = req.body.noOfUsers;  // set the bears name (comes from the request)
                out.websiteTitle = req.body.websiteTitle;  // set the bears name (comes from the request)
                out.save(function(err, data) {
                    if (err)
                        res.send(err);

                    res.json(data);
                });
            }
            else
            {
                setting.save(function(err, data) {
                    if (err)
                        res.send(err);

                    res.json(data);
                });
            }
        });        

    });

router.route('/person')
    // create a person 
    .post(function(req, res) {

        var person = new Person();      // create a new instance of the Bear model
        person.person = req.body;  // set the bears name (comes from the request)

        // save the person and check for errors
        person.save(function(err, data) {
            if (err)
                res.send(err);

            res.json(data);
        });

    });

router.route('/person')
    .get(function(req, res) {

        Person.find(function (err, docs) {
            res.json(docs);
        });

    });

router.route('/person/:id')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.id) {
            Person.findById(req.params.id, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.route('/person/:id')
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Person.findById(req.params.id, function(err, person) {

            if (err)
                res.send(err);

            person.person = req.body;  // set the person

            // save the bear
            person.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Person updated!' });
            });

        });
    });

router.route('/person/:id')
    .delete(function(req, res) {

        Person.remove({
            _id: req.params.id
        }, function(err, person) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });

router.route('/formfield/add')

    // create a formfield 
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

    .post(function(req, res) {
        Admin.findOne({ "admin.username": req.body.username }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

        // check if password matches
            if (user.admin.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                console.log("secret:" + app.get('superSecret'));
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    admin:user
                });
            }   

        }

    });
});


router.route('/admin')
    // create a person 
    .post(function(req, res) {

        var admin = new Admin();      // create a new instance of the Bear model
        admin.admin = req.body;  // set the bears name (comes from the request)
        admin.save(function(err, data) {
            if (err)
                res.send(err);

            res.json(data);
        });

    });

router.route('/admin')
    .get(function(req, res) {

        Admin.find(function (err, docs) {
            res.json(docs);
        });

    });

router.route('/admin/:id')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {

       if (req.params.id) {
            Admin.findById(req.params.id, function (err, docs) {
                res.json(docs);
            });
       }
    });

router.route('/admin/:id')
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Admin.findById(req.params.id, function(err, admin) {

            if (err)
                res.send(err);

            admin.admin = req.body;  // set the person

            // save the bear
            admin.save(function(err, data) {
                if (err)
                    res.send(err);

                res.json(data);
            });

        });
    });

router.route('/admin/:id')
    .delete(function(req, res) {

        Admin.remove({
            _id: req.params.id
        }, function(err, admin) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });

module.exports = router;
